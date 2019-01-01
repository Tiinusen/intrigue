import { State } from './Session';
import { GenerateUUID } from './UUID';

export class Link {
    constructor(source = null) {
        this.HubA = null;
        this.HubB = null;
        this.IsPreset = true;
        this.Preset = "relation";
        this.Importance = 1;
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
        this.Importance = source.Importance;
        this.Preset = source.Preset;
    }

    Serialize() {
        return {
            id: this.id,
            HubA: this.HubA === null ? null : this.HubA.id,
            HubB: this.HubB === null ? null : this.HubB.id,
            IsPreset: this.IsPreset,
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