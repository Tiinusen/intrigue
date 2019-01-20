import { Copy, IsEmpty } from "../utils/Entity";
import { GenerateUUID } from "../utils/UUID";

export class Scene {
    constructor(source = null) {
        this.id = GenerateUUID();
        this.hubs = [];
        this.time = new Date('2018-11-21T06:45:00Z')
        this.created = null;
        this.expired = null;
        this.Copy(source);
    }
    Serialize() {
        let hubs = [];
        this.hubs.forEach(hubO => {
            hubs.push({
                hub: hubO.hub.id,
                latlng: {
                    lat: hubO.latlng.lat,
                    lng: hubO.latlng.lng
                }
            });
        });
        return {
            id: this.id,
            hubs: hubs,
            time: this.time === null ? null : this.time.getTime(),
            created: this.created === null ? null : this.created.getTime(),
            expired: this.expired === null ? null : this.expired.getTime(),

        };
    }
    get key() {
        return "Scene#" + this.id;
    }

    get name() {
        return this.id;
    }

    get type() {
        return "session/scene";
    }

    Clear() {
        this.hubs.splice(0, this.hubs.length);
    }
    AddHub(hub, lat = 0, lng = 0) {
        let found = false;
        this.hubs.forEach((p) => {
            if (p.hub === hub) {
                found = true;
                p.latlng.lat = lat;
                p.latlng.lng = lng;
            }
        });
        if (!found) {
            this.hubs.push({
                hub: hub,
                latlng: {
                    lat: lat,
                    lng: lng
                }
            });
        }
    }
    RemoveHub(a) {
        let found = false;
        for (let i = 0; i < this.hubs.length; i++) {
            let b = this.hubs[i].hub;
            if (a === b) {
                this.hubs.splice(i, 1);
                break;
            }
        }
    }
    Copy(source) {
        if (typeof source === 'undefined' || source === null) {
            return this;
        }
        if ('hubs' in source) {
            this.hubs.splice(0, this.hubs.length);
            source.hubs.forEach(hubP => {
                this.AddHub(hubP.hub, hubP.latlng.lat, hubP.latlng.lng);
            });
        }
        if ('latlng' in source) {
            this.latlng.lat = source.latlng.lat;
            this.latlng.lng = source.latlng.lng;
        }
        Copy(this, source, [
            "id",
        ]);
        if ('time' in source) {
            if (typeof source.time !== 'object') {
                source.time = new Date(source.time);
            }
            this.time = source.time;
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
    }
}