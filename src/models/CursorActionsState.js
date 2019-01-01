import { State } from "./Session";
import { Hub } from "./Hub";
import Vue from 'vue'

export class CursorActionsState {
    constructor() {
        this.Position = {
            lat: 0,
            lng: 0
        }
        this.Reset();
    }
    Reset() {
        this.ShowCursor = false;
        this.Position.lat = 0;
        this.Position.lng = 0;
        return true;
    }
    Show(pos) {
        this.Reset();
        this.Position.lat = pos.lat;
        this.Position.lng = pos.lng;
        this.ShowCursor = true;
    }
    CreateOrganization() {
        let hub = new Hub();
        hub.type = "group_organization";
        hub.position.lat = this.Position.lat;
        hub.position.lng = this.Position.lng;
        this.Reset();
        if (State.ActiveSession.HubSelectedForConnectA !== null) {
            State.ActiveSession.HubSelectedForConnectB = hub;
        }
        Vue.nextTick(() => {
            hub.state.EditForm();
        });
    }
    CreatePlace() {
        let hub = new Hub();
        hub.type = "place";
        hub.position.lat = this.Position.lat;
        hub.position.lng = this.Position.lng;
        this.Reset();
        if (State.ActiveSession.HubSelectedForConnectA !== null) {
            State.ActiveSession.HubSelectedForConnectB = hub;
        }
        Vue.nextTick(() => {
            hub.state.EditForm();
        });
    }
    CreateEvent() {
        let hub = new Hub();
        hub.type = "event";
        hub.position.lat = this.Position.lat;
        hub.position.lng = this.Position.lng;
        this.Reset();
        if (State.ActiveSession.HubSelectedForConnectA !== null) {
            State.ActiveSession.HubSelectedForConnectB = hub;
        }
        Vue.nextTick(() => {
            hub.state.EditForm();
        });
    }
    CreateCharacter() {
        let hub = new Hub();
        hub.position.lat = this.Position.lat;
        hub.position.lng = this.Position.lng;
        this.Reset();
        if (State.ActiveSession.HubSelectedForConnectA !== null) {
            hub.CopyFrom(State.ActiveSession.HubSelectedForConnectA, true);
            State.ActiveSession.HubSelectedForConnectB = hub;
        }
        hub.type = "character";
        Vue.nextTick(() => {
            hub.state.EditForm();
        });
    }
}