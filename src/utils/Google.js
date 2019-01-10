import { InjectScript } from './Inject'

let _waitingForGoogleAPICallbacks = [];
let _loadedAPIs = {};

window.onGoogleAPILoaded = function () {
    delete window["onGoogleAPILoaded"];
    _waitingForGoogleAPICallbacks.forEach(resolve => resolve());
    _waitingForGoogleAPICallbacks = [];
}

if (typeof gapi === 'undefined') {
    InjectScript("https://apis.google.com/js/api.js?onload=onGoogleAPILoaded");
}

export function WaitForGoogleAPIToLoad() {
    return new Promise((resolve) => _waitingForGoogleAPICallbacks.push(resolve));
}

export function Load(name) {
    return new Promise(async (resolve, reject) => {
        if (_waitingForGoogleAPICallbacks.length > 0) { // Waits if Google API hasn't been loaded yet
            await WaitForGoogleAPIToLoad();
        }
        if (!(name in _loadedAPIs)) {
            _loadedAPIs[name] = new Array();
            _loadedAPIs[name].push({ resolve, reject });
            gapi.load(name, () => {
                _loadedAPIs[name].forEach((rr) => rr.resolve());
                _loadedAPIs[name] = true;
            });
            return;
        }
        if (typeof _loadedAPIs[name] !== 'object' || !(_loadedAPIs[name] instanceof Array)) {
            return resolve(_loadedAPIs[name]);
        }
        _loadedAPIs[name].push({ resolve, reject });
    });
}