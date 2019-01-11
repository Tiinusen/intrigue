import { InjectScript } from './Inject'

let _waitingForGoogleAPICallbacks = [];
let _loadedAPIs = {};

window.onGoogleAPILoaded = async function () {
    delete window["onGoogleAPILoaded"];
    await new Promise(resolve => setTimeout(resolve,  100));
    _waitingForGoogleAPICallbacks.forEach(resolve => resolve());
    _waitingForGoogleAPICallbacks = true;
}

if (typeof gapi === 'undefined') {
    InjectScript("https://apis.google.com/js/api.js?onload=onGoogleAPILoaded");
}

export function WaitForGoogleAPIToLoad() {
    if (_waitingForGoogleAPICallbacks === true) {
        return new Promise(resolve => setTimeout(resolve, 100 * 1000));
    }
    return new Promise((resolve) => _waitingForGoogleAPICallbacks.push(resolve));
}

export function Load(name) {
    return new Promise(async (resolve, reject) => {
        await WaitForGoogleAPIToLoad();
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