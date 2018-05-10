/// <reference path="typings/service-worker.d.ts" />
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
var CACHE_NAME = 'V1';
/**
 * The install event is fired when the registration succeeds.
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener('install', function () { return __awaiter(_this, void 0, void 0, function () {
    var cache;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, caches.open(CACHE_NAME)];
            case 1:
                cache = _a.sent();
                cache.addAll([
                    '/index.html',
                    '/main.js',
                    '/styles/reset.css',
                    '/styles/main.css',
                    '/pwa0-64.png'
                ]);
                return [2 /*return*/];
        }
    });
}); });
/**
 * The fetch event is fired every time the browser sends a request.
 * In this case, the service worker acts as a proxy. We can for example return the cached
 * version of the ressource matching the request, or send the request to the internet
 * , we can even make our own response from scratch !
 * Here, we are going to use cache first strategy
 */
self.addEventListener('fetch', function (event) {
    //We defind the promise (the async code block) that return either the cached response or the network one
    //It should return a response object
    var getCustomResponsePromise = function () { return __awaiter(_this, void 0, void 0, function () {
        var cachedResponse, netResponse, cache, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("URL " + event.request.url, "location origin " + location);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!!event.request.url.startsWith('http')) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch(event.request)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, caches.match(event.request)];
                case 4:
                    cachedResponse = _a.sent();
                    if (cachedResponse) {
                        //Return the cached response if present
                        console.log("Cached response " + cachedResponse);
                        return [2 /*return*/, cachedResponse];
                    }
                    return [4 /*yield*/, fetch(event.request)];
                case 5:
                    netResponse = _a.sent();
                    console.log("adding net response to cache");
                    return [4 /*yield*/, caches.open(CACHE_NAME)];
                case 6:
                    cache = _a.sent();
                    //We must provide a clone of the response here
                    cache.put(event.request, netResponse.clone());
                    //return the network response
                    return [2 /*return*/, netResponse];
                case 7:
                    err_1 = _a.sent();
                    console.error("Error " + err_1);
                    throw err_1;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    //In order to override the default fetch behavior, we must provide the result of our custom behavoir to the
    //event.respondWith method
    event.respondWith(getCustomResponsePromise());
});
