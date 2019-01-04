// This util is mostly used for bridging between normal DOM events to Vue Methods
// Was created as a workaround to why click events didn't fire inside leaflet map when button was placed on a marker

import { GenerateUUID } from './UUID'
import Vue from "vue";

var _hooks = {};

// Will be true if it was less than 100ms since a proxy link was pressed
// Used primary to avoid event propagation between this proxy and Vue @click events
export var WasProxyActiveRecently = false;

export function proxy(func, delay = null, ...params) {
    for (let key in _hooks) {
        let hook = _hooks[key];
        if (hook.func === func && params.length === hook.params.length) {
            let notSame = false;
            for (let i = 0; i < params.length; i++) {
                if (params[i] !== hook.params[i]) {
                    notSame = true;
                    break
                }
            }
            if (notSame) {
                continue;
            }
            return "callProxy('" + key + "'," + (delay === null ? 'null' : delay) + ", event)";
        }
    }
    let key = GenerateUUID();
    let hook = {
        func: func.bind(this),
        params: params,
        this: this
    };
    _hooks[key] = hook;
    return "callProxy('" + key + "'," + (delay === null ? 'null' : delay) + ", event)";
}

function CallWithoutBounce(key, event) {
    try {
        let hook = _hooks[key];
        hook.func.call(hook.this, ...hook.params, event);
    } catch (e) {
        console.error(e);
    }
}

let Call = Vue._.debounce(function (key, event) {
    try {
        let hook = _hooks[key];
        hook.func.call(hook.this, ...hook.params, event);
    } catch (e) {
        console.error(e);
    }

    // All following lines are just for event propagation prevention
    WasProxyActiveRecently = true;
    setTimeout(() => {
        WasProxyActiveRecently = false;
    }, 50);
}, 2);



window.callProxy = function (key, delay, event) {
    if (WasProxyActiveRecently) {
        return;
    }

    if(delay === null){
        CallWithoutBounce(key, event);    
    }else{
        setTimeout((key, event) => {
            Call(key, event);
        }, delay + 10, key, event);
    }
    return;
}