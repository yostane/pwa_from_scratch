addEventListener("DOMContentLoaded", function (event) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (serviceWorker) {
            console.log('Service worker registered ' + serviceWorker);
        }).catch(function (error) {
            console.log('Service worker registered ' + error);
        });
    }
});