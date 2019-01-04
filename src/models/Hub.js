import { Copy, IsEmpty } from "../utils/Entity";
import { GenerateUUID } from "../utils/UUID";
import { Avatar } from './Avatar'

export const HubTypes = {
    "Character": [
        "Identity",
        "NPC",
        "PC",
        "Threat"
    ],
    "Event": [
        "NA"
    ],
    "Place": [
        "NA"
    ],
    "Organization / Group": [
        "NA"
    ]
};

export const HubTypeNames = Object.keys(HubTypes);

export class Hub {
    constructor(source = null, inspire = false) {
        this.id = GenerateUUID();
        this.latlng = {
            lat: 0,
            lng: 0
        };
        this.avatar = new Avatar();
        this.hubType = HubTypes[0]
        this.hubSubType = HubTypes[HubTypeNames[0]][0];
        this.Copy(source, inspire);
    }

    get lat() {
        if (typeof this.latlng === 'undefined' || this.latlng === null) {
            return null;
        }
        return this.latlng.lat;
    }

    get lng() {
        if (typeof this.latlng === 'undefined' || this.latlng === null) {
            return null;
        }
        return this.latlng.lng;
    }

    set lat(lat = null) {
        if (typeof lat === 'undefined' || lat === null) {
            return;
        }
        this.latlng.lat = lat;
    }

    set lng(lng = null) {
        if (typeof lng === 'undefined' || lng === null) {
            return;
        }
        this.latlng.lng = lng;
    }

    get key() {
        return "Hub#" + this.id;
    }

    get name() {
        return this.id;
    }

    get type() {
        return "session/hub";
    }

    get url() {
        return GenerateURL(this);
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
            "hubType",
            "hubSubType"
        ]);
        if ('avatar' in source) {
            this.avatar.Copy(source.avatar, sibling);
        }
        if (sibling) {
            return this;
        }
        Copy(this, source, [
            "id",
            "hubType",
            "hubSubType",
            "lat",
            "lng"
        ]);
        return this;
    }
}