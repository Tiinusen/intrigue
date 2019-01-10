import { ArrayToObject } from "../utils/Convert";
import { Copy, IsEmpty } from "../utils/Entity";
import { GenerateUUID } from "../utils/UUID";
import { Avatar } from './Avatar'


export const HubTypes = ArrayToObject({
    "Character": [
        "Identity",
        "NPC",
        "PC",
        "Threat"
    ],
    "Event": [
        {
            "Gathering": [
                "Meeting",
                "Party",
                "Other"
            ],
            "Mission": [
                "Retrieval",
                "Assasination",
                "Abduction",
                "Arrest",
                "Other"
            ],
            "Crime": [
                "Assault",
                "Murder",
                "Theft",
                "Rape",
                "Kidnapping",
                "Other"
            ]
        },
        "Other"
    ],
    "Place": {
        "Country": [
            "Nation",
            "Region",
            "City",
            "Town"
        ],
        "Building": [
            {
                "House": [
                    "Ordinary",
                    "Fancy",
                    "Decayed"
                ]
            },
            "Apartment Building",
            "Mansion",
            "Hotel",
            "Villa",
            "Hidden",
            "Other"
        ],
        "Location": [
            "Point",
            "Area"
        ]
    },
    "Group": [
        "People",
        "Mob",
        {
            "Organization": [
                "Business",
                "Secret",
                "Government",
                "Other"
            ]
        },
        "Gang",
        "Worshippers"
    ]
});

export const HubTypeNames = Object.keys(HubTypes);

export class Hub {
    constructor(source = null, inspire = false) {
        this.id = GenerateUUID();
        this.latlng = {
            lat: 0,
            lng: 0
        };
        this.links = [];
        this.avatar = new Avatar();
        this.hubType = "Character.Identity"
        this.Copy(source, inspire);
    }

    Serialize() {
        return {
            id: this.id,
            lat: this.lat,
            lng: this.lng,
            avatar: this.avatar.Serialize(),
            hubType: this.hubType
        };
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
        return (this.firstName + " " + this.lastName).trim();
    }

    set name(value) {
        value = value.replace(/  /g, " ");
        let parts = value.split(" ", 2);
        this.firstName = parts[0];
        this.lastName = parts[1];
    }

    get displayName() {
        if (this.name)
            return this.key;
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

    get url() {
        if (this.ofType("Character")) {
            return this.avatar.url;
        } else {
            return "/icons/" + this.hubType.replace(/\./g, '/').replace(/ /g, '_').toLowerCase() + ".png";
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
        Copy(this, source, [
            "id",
            "lat",
            "lng"
        ]);
        return this;
    }
}