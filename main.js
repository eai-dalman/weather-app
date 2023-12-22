var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Fetches weather data for the given location.
 * @param {string} searchQuery - The location to search for.
 * @returns {Promise<object>} - A promise resolving to the weather data.
 * @throws {object} - An object containing the error details if the request fails.
 */
function getWeather(searchQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var baseURL, key, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseURL = "https://api.openweathermap.org/data/2.5/weather";
                    key = "212d82148d4a4e83d37bac52eb38c4e7";
                    return [4 /*yield*/, fetch("".concat(baseURL, "?q=").concat(searchQuery, "&appid=").concat(key))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (response.status == 200) {
                        return [2 /*return*/, data];
                    }
                    else {
                        throw data;
                    }
                    return [2 /*return*/];
            }
        });
    });
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
function createCard(options) {
    var _a = options.headText, headText = _a === void 0 ? "" : _a, _b = options.bodyText, bodyText = _b === void 0 ? "" : _b, _c = options.footerText, footerText = _c === void 0 ? "" : _c, _d = options.iconName, iconName = _d === void 0 ? "" : _d, dynamicIcon = options.dynamicIcon;
    // Icon
    var icon = "assets/icons/".concat(iconName, ".svg");
    if (dynamicIcon) {
        if (iconName) {
            icon = "https://openweathermap.org/img/wn/".concat(iconName, "@2x.png");
        }
        else {
            icon = "assets/icons/weather.svg";
        }
    }
    // Design
    var template = document.createElement("template");
    template.innerHTML = "\n  <div class=\"card-container\">\n    <img class=\"card-icon\" src=\"".concat(icon, "\" />\n    <div class=\"card-content\">\n      <span class=\"card-text-head\">").concat(headText, "</span>\n      <span class=\"card-text-body\">").concat(bodyText, "</span>\n      <span class=\"card-text-footer\">").concat(footerText, "</span>\n    </div>\n  </div>");
    // Render
    var card = template.content.firstElementChild;
    var container = document.getElementById("cards-section");
    container.appendChild(card);
}
/**
 * Creates an alert for displaying error messages.
 * @param {string} errorMessage - The error message to display.
 */
function createAlert(errorMessage) {
    var template = document.createElement("template");
    template.innerHTML = "<div id=\"alert\" class=\"alert\">".concat(errorMessage, "</div>");
    var errorCard = template.content.firstElementChild;
    document.body.appendChild(errorCard);
    setTimeout(function () {
        errorCard.style.opacity = "0";
        setTimeout(function () {
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
function getFormattedDateTime(timestamp, timezone) {
    var utcTime = (timestamp + timezone) * 1000;
    var date = new Date(utcTime);
    var hours = ("0" + date.getUTCHours()).slice(-2);
    var minutes = ("0" + date.getUTCMinutes()).slice(-2);
    var formattedTime = "".concat(hours, ":").concat(minutes);
    return formattedTime;
}
/**
 * Determines the time of day based on timestamp and timezone.
 * @param {number} timestamp - The timestamp.
 * @param {number} timezone - The timezone offset.
 * @returns "morning" | "afternoon" | "evening" - The time of day.
 */
function getTimeOfDay(timestamp, timezone) {
    var utcTime = timestamp + timezone;
    var date = new Date(utcTime * 1000);
    var hours = date.getUTCHours();
    if (hours >= 5 && hours < 12) {
        return "morning";
    }
    else if (hours >= 12 && hours < 17) {
        return "afternoon";
    }
    else {
        return "evening";
    }
}
/**
 * Gets cloud coverage details based on the percentage.
 * @param {number} percentage - The percentage of cloud coverage.
 * @returns {string} - The type of cloud coverage.
 */
function getCloudCoverageDetails(percentage) {
    var cloudType;
    if (percentage === 0) {
        cloudType = "No Clouds";
    }
    else if (percentage > 0 && percentage <= 30) {
        cloudType = "Partly Cloudy";
    }
    else if (percentage > 30 && percentage <= 70) {
        cloudType = "Cloudy";
    }
    else {
        cloudType = "Heavy Clouds";
    }
    return cloudType;
}
/**
 * Gets wind speed details in both kilometers per hour and miles per hour.
 * @param {number} windSpeed - The wind speed in meters per second.
 * @returns {{kph: string, mph: string}} - Wind speed details.
 */
function getWindSpeedDetails(windSpeed) {
    var kph = windSpeed * 3.6;
    var mph = windSpeed * 2.23694;
    return { kph: "".concat(kph.toFixed(2), " km/h"), mph: "".concat(mph.toFixed(2), " mph") };
}
/**
 * Gets temperature details in both Celsius and Fahrenheit.
 * @param {number} tmpKelvin - The temperature in Kelvin.
 * @returns {{celsius: string, fahrenheit: string}} - Temperature details.
 */
function getTemperatureDetails(tmpKelvin) {
    var tmpCelsius = tmpKelvin - 273.15;
    var tmpFahrenheit = (tmpKelvin - 273.15) * (9 / 5) + 32;
    var celsius = "".concat(tmpCelsius.toFixed(2), " \u00B0C");
    var fahrenheit = "".concat(tmpFahrenheit.toFixed(2), " \u00B0F");
    return { celsius: celsius, fahrenheit: fahrenheit };
}
/**
 * Displays weather information cards for the given location.
 * @param {string} searchQuery - The location to display weather information for.
 * @returns {Promise<void>} - A promise resolving when the cards are displayed.
 */
function displayCards(searchQuery) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function () {
        var data, container, timeOfDay, bannerSection, clockElem, placeNameElem, placeName, date, _l, celsius, fahrenheit, _m, kph, mph, err_1;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _o.trys.push([0, 2, , 3]);
                    // Default animation
                    if (document.startViewTransition) {
                        window.document.startViewTransition();
                    }
                    return [4 /*yield*/, getWeather(searchQuery)];
                case 1:
                    data = _o.sent();
                    window.localStorage.setItem("prev-search-query", searchQuery);
                    container = document.getElementById("cards-section");
                    container.innerHTML = "";
                    timeOfDay = getTimeOfDay(data.dt, data.timezone);
                    bannerSection = document.getElementById("hero-section");
                    bannerSection.style.backgroundImage = "url(assets/".concat(timeOfDay, ".svg)");
                    clockElem = document.getElementById("clock-time");
                    placeNameElem = document.getElementById("place-name");
                    if (timeOfDay === "morning") {
                        clockElem.style.color = "var(--dark-text)";
                        placeNameElem.style.color = "var(--dark-text)";
                    }
                    else {
                        clockElem.style.color = "var(--light-text)";
                        placeNameElem.style.color = "var(--light-text)";
                    }
                    placeName = data.name;
                    date = getFormattedDateTime(data.dt, data.timezone);
                    clockElem.innerHTML = date;
                    placeNameElem.innerHTML = (placeName || "").toUpperCase();
                    // Weather Card
                    createCard({
                        headText: "Current Weather",
                        bodyText: (_b = (_a = data.weather) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.description,
                        iconName: (_d = (_c = data.weather) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.icon,
                        footerText: getCloudCoverageDetails((_e = data.clouds) === null || _e === void 0 ? void 0 : _e.all),
                        dynamicIcon: true,
                    });
                    // Sunrise Card
                    createCard({
                        headText: "Sunrise",
                        bodyText: getFormattedDateTime((_f = data.sys) === null || _f === void 0 ? void 0 : _f.sunrise, data.timezone),
                        iconName: "sunrise",
                    });
                    // Sunset Card
                    createCard({
                        headText: "Sunset",
                        bodyText: getFormattedDateTime((_g = data.sys) === null || _g === void 0 ? void 0 : _g.sunset, data.timezone),
                        iconName: "sunset",
                    });
                    // Humidity Card
                    createCard({
                        headText: "Humidity",
                        bodyText: "".concat((_h = data.main) === null || _h === void 0 ? void 0 : _h.humidity, "%"),
                        iconName: "humidity",
                    });
                    _l = getTemperatureDetails((_j = data.main) === null || _j === void 0 ? void 0 : _j.feels_like), celsius = _l.celsius, fahrenheit = _l.fahrenheit;
                    createCard({
                        headText: "Temperature Feels Like",
                        bodyText: celsius,
                        footerText: fahrenheit,
                        iconName: "temperature",
                    });
                    _m = getWindSpeedDetails((_k = data.wind) === null || _k === void 0 ? void 0 : _k.speed), kph = _m.kph, mph = _m.mph;
                    createCard({
                        headText: "Wind Speed",
                        bodyText: kph,
                        footerText: mph,
                        iconName: "wind",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _o.sent();
                    createAlert((err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || "city not found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Initiates a weather search based on the input field value.
 */
function searchWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var searchField, searchQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchField = document.getElementById("search-field");
                    searchQuery = searchField.value.trim();
                    if (!(searchQuery !== "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, displayCards(searchQuery)];
                case 1:
                    _a.sent();
                    searchField.value = "";
                    return [3 /*break*/, 3];
                case 2:
                    createAlert("Please enter a location");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
var previousSearchQuery = localStorage.getItem("prev-search-query");
displayCards(previousSearchQuery || "Manila");
