import { ArrayToObject } from "../utils/Convert";
import { Copy, IsEmpty } from "../utils/Entity";
import { GenerateUUID } from "../utils/UUID";
import { Avatar } from './Avatar'
import predefinedHubTypes from './predefined_hub_types';


export const HubTypes = ArrayToObject(predefinedHubTypes);

export const HubTypeNames = Object.keys(HubTypes);

export class Hub {
    constructor(source = null, inspire = false) {
        this.id = GenerateUUID();
        this.links = [];
        this.avatar = new Avatar();
        this.hubType = "PC"
        this.created = null;
        this.expired = null;
        this.Copy(source, inspire);
    }

    Serialize() {
        return {
            id: this.id,
            avatar: this.avatar.Serialize(),
            hubType: this.hubType,
            created: this.created === null ? null : this.created.getTime(),
            expired: this.expired === null ? null : this.expired.getTime()
        };
    }

    get key() {
        return "Hub#" + this.id;
    }

    get name() {
        return (this.firstName + " " + this.lastName).trim();
    }

    set name(value) {
        value = value.replace(/  /g, " ");
        let parts = value.split(" ", 2);
        this.firstName = parts[0];
        this.lastName = parts[1];
    }

    get displayName() {
        if (this.name.length === 0) {
            return this.key;
        }
    }

    get type() {
        return "session/hub";
    }

    get subType() {
        let parts = this.hubType.split(".");
        return parts[parts.length - 1];
    }

    ofType(path) {
        return path === this.hubType.substr(0, path.length);
    }

    /**
     * Checks if hub is relevant for time
     * @param {Date} time 
     */
    isRelevant(time) {
        if (this.created !== null && this.created.getTime() > time.getTime()) {
            return false;
        }
        if (this.expired !== null && this.expired.getTime() < time.getTime()) {
            return false;
        }
        return true;
    }

    get url() {
        if (this.ofType("PC") || this.ofType("Leader") || this.ofType("Contact")) {
            return this.avatar.url;
        } else {
            return "/iconsets/default/" + this.hubType.replace(/\./g, '/').replace(/ /g, '_').toLowerCase() + ".png";
        }
    }

    /**
     * 
     * @param {Avatar} source 
     * @param {boolean} sibling // Inspire instead of just copy
     */
    Copy(source, sibling = false) {
        if (typeof source === 'undefined' || source === null) {
            return this;
        }
        Copy(this, source, [
            "hubType"
        ]);
        if ('avatar' in source) {
            this.avatar.Copy(source.avatar, sibling);
        }
        if (sibling) {
            return this;
        }
        if ('created' in source) {
            if (typeof source.created !== 'object') {
                source.created = new Date(source.created);
            }
            this.created = source.created;
        }
        if ('expired' in source) {
            if (typeof source.expired !== 'object') {
                source.expired = new Date(source.expired);
            }
            this.expired = source.expired;
        }
        Copy(this, source, [
            "id",
        ]);
        return this;
    }
}