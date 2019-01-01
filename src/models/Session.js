import { Hub } from './Hub';
import { Link } from './Link';
import { CursorActionsState } from './CursorActionsState';
import { GenerateUUID } from './UUID';

export function GetStoredSessions() {
    if (typeof (Storage) === "undefined") {
        return {};
    }
    let sessions = JSON.parse(localStorage.getItem("KultDivinityIntrigueMapSessions"));
    if (sessions === null) {
        return {};
    }
    return sessions;
}

export var Sessions = GetStoredSessions();

export function LoadSession(key) {
    if (!(key in Sessions)) {
        return false;
    }
    let session = Sessions[key];
    State.ActiveSession.Unserialize(session);
}

export function DeleteSession(key) {
    if (typeof (Storage) === "undefined") {
        return false;
    }
    delete Sessions[key];
    localStorage.setItem("KultDivinityIntrigueMapSessions", JSON.stringify(Sessions));
    return true;
}

export function SaveSession(key, session) {
    if (typeof (Storage) === "undefined") {
        return false;
    }
    Sessions[key] = session.Serialize();
    localStorage.setItem("KultDivinityIntrigueMapSessions", JSON.stringify(Sessions));
    return true;
}

export class Session {
    constructor() {
        this.Init();
    }
    Init() {
        this.id = GenerateUUID();
        if (typeof this.Hubs === 'undefined' || this.Hubs === null) {
            this.Hubs = [];
        } else {
            let hubs = [];
            this.Hubs.forEach((hub) => { // Copies to avoid mutating
                hubs.push(hub);
            });
            hubs.forEach((hub) => {
                hub.Remove();
            });
        }
        this.HubsByID = {};
        if (typeof this.Links === 'undefined' || this.Links === null) {
            this.Links = [];
        } else {
            let links = [];
            this.Links.forEach((link) => { // Copies to avoid mutating
                links.push(link);
            });
            links.forEach((link) => {
                link.Remove();
            });
        }
        this.LinksByID = {};
        this.HubSelectedForConnectA = null;
        this.HubSelectedForConnectB = null;
        this.ShowConnectDialog = false;
        this.ShowSaveLoadDialog = false;
        this.LastActiveState = null;
        this.Cursor = new CursorActionsState();
    }
    Serialize() {
        return {
            id: this.id,
            Hubs: this.Hubs.map((hub) => { return hub.Serialize() }),
            Links: this.Links.map((link) => { return link.Serialize() })
        };
    }
    Unserialize(obj) {
        this.Init();
        setTimeout(() => { // To avoid re-rendering problems when erasing the screen
            this.id = obj.id;
            obj.Hubs.forEach((hub) => {
                new Hub(hub);
            });
            obj.Links.forEach((link) => {
                new Link(link);
            });
        },100);
    }
}
export var State = {
    ActiveSession: new Session()
};

window.State = State;