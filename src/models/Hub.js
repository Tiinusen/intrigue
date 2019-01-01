import { State } from './Session';
import { Identity } from './Identity';
import { HubActionsState } from './HubActionsState';
import { Avatar } from './Avatar';
import { GenerateUUID } from './UUID';
import PlaceImage from "../assets/place.png";
import GroupOrganizationImage from "../assets/group-organization.png";
import EventImage from "../assets/event.png";

export class Hub {
    constructor(source = null, inspire = false) {
        this.id = "Hub#" + GenerateUUID();
        this.position = {
            lat: 0,
            lng: 0
        };
        this.identities = [];
        this.type = "character";
        this.characterType = "npc";
        this.avatar = new Avatar();
        this.links = [];
        if (source !== null) {
            this.CopyFrom(source, inspire)
        } else {
            this.identities.push(new Identity());
        }
        this.state = new HubActionsState(this);
        State.ActiveSession.Hubs.push(this);
        State.ActiveSession.HubsByID[this.id] = this;
    }

    get image() {
        switch (this.type) {
            case "group_organization":
                return GroupOrganizationImage;
            case "event":
                return EventImage;
            case "place":
            default:
                return PlaceImage;
        }
    }

    get name() {
        var name = this.identities[0].fullName.trim();
        if (name.trim() == "") {
            return this.id;
        }
        return name;
    }

    Serialize() {
        var identities = [];
        this.identities.forEach((identity) => {
            identities.push(identity.Serialize());
        });
        return {
            id: this.id,
            position: {
                lat: this.position.lat,
                lng: this.position.lng
            },
            type: this.type,
            identities: identities,
            characterType: this.characterType,
            avatar: this.avatar.Serialize(),
        };
    }

    CopyFrom(source, inspire) {
        this.type = source.type;
        this.characterType = source.characterType;
        source.identities.forEach((identity) => {
            this.identities.push(new Identity(identity));
        });
        this.avatar.CopyFrom(source.avatar, inspire);
        if (inspire) {
            return;
        }
        this.position = source.position;
        this.id = source.id;
    }

    Clone(inspire) {
        return new Hub(this, inspire);
    }

    Remove() {
        State.ActiveSession.Hubs.splice(State.ActiveSession.Hubs.indexOf(this), 1);
        delete State.ActiveSession.HubsByID[this.id];
        var links = [];
        this.links.forEach((link) => {
            links.push(link);
        });
        links.forEach((link) => {
            link.Remove();
        });
    }
}