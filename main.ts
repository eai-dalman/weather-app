/**
 * Fetches weather data for the given location.
 * @param {string} searchQuery - The location to search for.
 * @returns {Promise<object>} - A promise resolving to the weather data.
 * @throws {object} - An object containing the error details if the request fails.
 */
async function getWeather(searchQuery: string) {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const key = "212d82148d4a4e83d37bac52eb38c4e7";

  const response = await fetch(`${baseURL}?q=${searchQuery}&appid=${key}`);
  const data = await response.json();
  if (response.status == 200) {
    return data;
  } else {
    throw data;
  }
}

/**
 * Creates a weather information card.
 * @param {object} options - Options for creating the card.
 * @param {string} [options.headText=""] - The header text.
 * @param {string} options.bodyText - The main body text.
 * @param {string} [options.footerText=""] - The footer text.
 * @param {string} [options.iconName=""] - The icon name.
 * @param {boolean} [options.dynamicIcon] - Whether to use a dynamic icon.
 */
function createCard(options: {
  headText?: string;
  bodyText: string;
  footerText?: string;
  iconName?: string;
  dynamicIcon?: boolean;
}) {
  const {
    headText = "",
    bodyText = "",
    footerText = "",
    iconName = "",
    dynamicIcon,
  } = options;
  // Icon
  let icon = `assets/icons/${iconName}.svg`;
  if (dynamicIcon) {
    if (iconName) {
      icon = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
    } else {
      icon = `assets/icons/weather.svg`;
    }
  }

  // Design
  const template = document.createElement("template");
  template.innerHTML = `
  <div class="card-container">
    <img class="card-icon" src="${icon}" />
    <div class="card-content">
      <span class="card-text-head">${headText}</span>
      <span class="card-text-body">${bodyText}</span>
      <span class="card-text-footer">${footerText}</span>
    </div>
  </div>`;

  // Render
  const card = template.content.firstElementChild as HTMLElement;
  const container = document.getElementById("cards-section") as HTMLElement;
  container.appendChild(card);
}

/**
 * Creates an alert for displaying error messages.
 * @param {string} errorMessage - The error message to display.
 */
function createAlert(errorMessage: string): void {
  const template = document.createElement("template");
  template.innerHTML = `<div id="alert" class="alert">${errorMessage}</div>`;

  const errorCard = template.content.firstElementChild as HTMLElement;
  document.body.appendChild(errorCard);

  setTimeout(() => {
    errorCard.style.opacity = "0";
    setTimeout(() => {
      errorCard.remove();
    }, 500);
  }, 2000);
}

/**
 * Formats timestamp and timezone into a human-readable date and time.
 * @param {number} timestamp - The timestamp.
 * @param {number} timezone - The timezone offset.
 * @returns {string} - The formatted date and time.
 */
function getFormattedDateTime(timestamp: number, timezone: number): string {
  const utcTime = (timestamp + timezone) * 1000;
  const date = new Date(utcTime);

  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

/**
 * Determines the time of day based on timestamp and timezone.
 * @param {number} timestamp - The timestamp.
 * @param {number} timezone - The timezone offset.
 * @returns "morning" | "afternoon" | "evening" - The time of day.
 */
function getTimeOfDay(
  timestamp: number,
  timezone: number
): "morning" | "afternoon" | "evening" {
  const utcTime = timestamp + timezone;
  const date = new Date(utcTime * 1000);

  const hours = date.getUTCHours();

  if (hours >= 5 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 17) {
    return "afternoon";
  } else {
    return "evening";
  }
}

/**
 * Gets cloud coverage details based on the percentage.
 * @param {number} percentage - The percentage of cloud coverage.
 * @returns {string} - The type of cloud coverage.
 */
function getCloudCoverageDetails(percentage: number): string {
  let cloudType;

  if (percentage === 0) {
    cloudType = "No Clouds";
  } else if (percentage > 0 && percentage <= 30) {
    cloudType = "Partly Cloudy";
  } else if (percentage > 30 && percentage <= 70) {
    cloudType = "Cloudy";
  } else {
    cloudType = "Heavy Clouds";
  }

  return cloudType;
}

/**
 * Gets wind speed details in both kilometers per hour and miles per hour.
 * @param {number} windSpeed - The wind speed in meters per second.
 * @returns {{kph: string, mph: string}} - Wind speed details.
 */
function getWindSpeedDetails(windSpeed: number): { kph: string; mph: string } {
  const kph = windSpeed * 3.6;
  const mph = windSpeed * 2.23694;

  return { kph: `${kph.toFixed(2)} km/h`, mph: `${mph.toFixed(2)} mph` };
}

/**
 * Gets temperature details in both Celsius and Fahrenheit.
 * @param {number} tmpKelvin - The temperature in Kelvin.
 * @returns {{celsius: string, fahrenheit: string}} - Temperature details.
 */
function getTemperatureDetails(tmpKelvin: number): {
  celsius: string;
  fahrenheit: string;
} {
  const tmpCelsius = tmpKelvin - 273.15;
  const tmpFahrenheit = (tmpKelvin - 273.15) * (9 / 5) + 32;

  const celsius = `${tmpCelsius.toFixed(2)} °C`;
  const fahrenheit = `${tmpFahrenheit.toFixed(2)} °F`;

  return { celsius, fahrenheit };
}

/**
 * Displays weather information cards for the given location.
 * @param {string} searchQuery - The location to display weather information for.
 * @returns {Promise<void>} - A promise resolving when the cards are displayed.
 */
async function displayCards(searchQuery: string): Promise<void> {
  try {
    const data = await getWeather(searchQuery);
    window.localStorage.setItem("prev-search-query", searchQuery);

    // Clear Cards
    const container = document.getElementById("cards-section") as HTMLElement;
    container.innerHTML = "";

    // Hero Section - Image
    let timeOfDay = getTimeOfDay(data.dt, data.timezone);
    const bannerSection = document.getElementById(
      "hero-section"
    ) as HTMLElement;
    bannerSection.style.backgroundImage = `url(assets/${timeOfDay}.svg)`;

    // Hero Section - Color of text
    const clockElem = document.getElementById("clock-time") as HTMLElement;
    const placeNameElem = document.getElementById("place-name") as HTMLElement;
    if (timeOfDay === "morning") {
      clockElem.style.color = "var(--dark-text)";
      placeNameElem.style.color = "var(--dark-text)";
    } else {
      clockElem.style.color = "var(--light-text)";
      placeNameElem.style.color = "var(--light-text)";
    }

    // Header Section
    const placeName = data.name;
    const date = getFormattedDateTime(data.dt, data.timezone);
    clockElem.innerHTML = date;
    placeNameElem.innerHTML = (placeName || "").toUpperCase();

    // Weather Card
    createCard({
      headText: "Current Weather",
      bodyText: data.weather?.[0]?.description,
      iconName: data.weather?.[0]?.icon,
      footerText: getCloudCoverageDetails(data.clouds?.all),
      dynamicIcon: true,
    });

    // Sunrise Card
    createCard({
      headText: "Sunrise",
      bodyText: getFormattedDateTime(data.sys?.sunrise, data.timezone),
      iconName: "sunrise",
    });

    // Sunset Card
    createCard({
      headText: "Sunset",
      bodyText: getFormattedDateTime(data.sys?.sunset, data.timezone),
      iconName: "sunset",
    });

    // Humidity Card
    createCard({
      headText: "Humidity",
      bodyText: `${data.main?.humidity}%`,
      iconName: "humidity",
    });

    // Temperature Card
    const { celsius, fahrenheit } = getTemperatureDetails(
      data.main?.feels_like
    );
    createCard({
      headText: "Temperature Feels Like",
      bodyText: celsius,
      footerText: fahrenheit,
      iconName: "temperature",
    });

    // Wind Speed Card
    const { kph, mph } = getWindSpeedDetails(data.wind?.speed);
    createCard({
      headText: "Wind Speed",
      bodyText: kph,
      footerText: mph,
      iconName: "wind",
    });
  } catch (err) {
    createAlert(err?.message || "city not found");
  }
}

/**
 * Initiates a weather search based on the input field value.
 */
async function searchWeather(): Promise<void> {
  const searchField = <HTMLInputElement>document.getElementById("search-field");
  const searchQuery = searchField.value.trim();

  if (searchQuery !== "") {
    await displayCards(searchQuery);
    searchField.value = "";
  } else {
    createAlert("Please enter a location");
  }
}

const previousSearchQuery = localStorage.getItem("prev-search-query");
displayCards(previousSearchQuery || "Manila");
