import { State } from './Session';
import { GenerateUUID } from './UUID';

function CheckHubTypes(a, b, typeA, typeB) {
    if (a.type == typeA && b.type == typeB) {
        return true;
    } else if (a.type == typeB && b.type == typeA) {
        return true;
    }
    return false;
}

export class Link {
    constructor(source = null) {
        this.HubA = null;
        this.HubB = null;
        this.Preset = "Input";
        this.Color = "black";
        this.LineThickness = 1;
        this.AtoB = "";
        this.BtoA = "";
        if (source === null) {
            this.id = "Link#" + GenerateUUID();
        } else if (source !== false) {
            this.CopyFrom(source)
            if (typeof this.id === 'undefined') {
                this.id = "Link#" + GenerateUUID();
            }
        }
        if (typeof this.id !== 'undefined') {
            State.ActiveSession.Links.push(this);
            State.ActiveSession.LinksByID[this.id] = this;
        }
    }
    IsPreset() {
        return this.Preset !== "Input";
    }

    CopyFrom(source) {
        this.id = source.id;
        this.HubA = source.HubA;
        if (typeof this.HubA === "string") {
            this.HubA = State.ActiveSession.HubsByID[this.HubA];
        }
        if (this.HubA.links.indexOf(this) === -1) {
            this.HubA.links.push(this);
        }
        this.HubB = source.HubB;
        if (typeof this.HubB === "string") {
            this.HubB = State.ActiveSession.HubsByID[this.HubB];
        }
        if (this.HubB.links.indexOf(this) === -1) {
            this.HubB.links.push(this);
        }
        this.AtoB = source.AtoB;
        this.BtoA = source.BtoA;
        this.LineThickness = source.LineThickness;
        this.Preset = source.Preset;
        this.Color = source.Color;
    }
    get Type() {
        if (this.HubA === null || this.HubB === null) {
            return "";
        }
        let types = ["character", "event", "place", "group_organization"];
        for (let ia = 0; ia < types.length; ia++) {
            for (let ib = 0; ib < types.length; ib++) {
                if (CheckHubTypes(this.HubA, this.HubB, types[ia], types[ib])) {
                    return types[ia] + "_" + types[ib];
                }
            }
        }
        return "unknown (" + this.HubA.type + " " + this.HubB.type + ")";
    }

    Serialize() {
        return {
            id: this.id,
            HubA: this.HubA === null ? null : this.HubA.id,
            HubB: this.HubB === null ? null : this.HubB.id,
            Preset: this.Preset,
            AtoB: this.AtoB,
            BtoA: this.BtoA,
            Importance: this.Importance
        };
    }

    Remove() {
        if (this.HubA !== null) {
            this.HubA.links.splice(this.HubA.links.indexOf(this), 1);
        }
        if (this.HubB !== null) {
            this.HubB.links.splice(this.HubB.links.indexOf(this), 1);
        }
        State.ActiveSession.Links.splice(State.ActiveSession.Links.indexOf(this), 1);
        delete State.ActiveSession.LinksByID[this.id];
    }
}