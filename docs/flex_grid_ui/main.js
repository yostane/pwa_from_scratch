var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
//create an empty array on startup
var animeHistory = [];
var API_BASE = 'https://api.jikan.moe/';
var API_ANIME = API_BASE + 'anime/';
var HISTORY_STORAGE_KEY = 'HISTORY_KEY';
/**
 * generate anime tag
 */
function buildAnimeMarkup(anime) {
    return "<div class=\"anime_item\">\n            <img class='anime_image' src=" + anime.image_url + " />\n            <div class='anime_content'>\n            <h2 class='anime_name'>" + anime.title + "</h2>\n            <p class='anime_description'>" + anime.synopsis + "</p>\n            <p class='anime_date'>" + anime.aired_string + "</p>\n            </div>\n          </div>";
}
/**
 * add an anime to the history and updates display
 */
function updateHistory(anime) {
    animeHistory.push(anime);
    //Save the array in the local storage. JSON.stringify allows to serialize the array to a string
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(animeHistory));
    //update display
    addAnimeToHistoryTag(anime);
}
/**
 * Update the DOM
 */
function addAnimeToHistoryTag(anime) {
    document.querySelector('#history').innerHTML =
        buildAnimeMarkup(anime) + document.querySelector('#history').innerHTML;
}
/**
 * loadAnAnime from the internet and place it on a target element
 */
function onOkButtonClickAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var targetElementId, animeId, response, anime, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetElementId = '#main_anime';
                    animeId = document.querySelector('#anime_id_input').value;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(API_ANIME + animeId)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    anime = _a.sent();
                    console.log('anime', anime);
                    document.querySelector(targetElementId).innerHTML = buildAnimeMarkup(anime);
                    updateHistory(anime);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("error " + err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * The history is serrialized as a JSON array. We use JSON.parse to convert is to a Javascript array
 */
function getLocalHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));
}
function onLoadAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var history, serviceWorker, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    history = getLocalHistory();
                    if (history !== null) {
                        //set the animeHistory array and update the display
                        animeHistory = history;
                        animeHistory.forEach(function (anime) { return addAnimeToHistoryTag(anime); });
                    }
                    if (!('serviceWorker' in navigator)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.serviceWorker.register('/sw.js')];
                case 2:
                    serviceWorker = _a.sent();
                    console.log("Service worker registered " + serviceWorker);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Failed to register service worker: " + err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('load', function (event) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, onLoadAsync()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
