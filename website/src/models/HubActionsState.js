import { State } from "./Session";
import { Hub } from "./Hub";
import Vue from 'vue'

export class HubActionsState {
    constructor(hub) {
        this.hub = hub;
        this.markerDraggable = false;
        this.showEditForm = false;
        this.showSpeedDialMenu1 = false;
        this.showSpeedDialMenu2 = false;
        this.showSpeedDialMenu3 = false;
    }
    Reset(force = false) {
        if (
            !this.markerDraggable &
            !this.showEditForm &
            !this.showSpeedDialMenu1 &
            !this.showSpeedDialMenu2 &
            !this.showSpeedDialMenu3 &
            !force
        ) {
            return false;
        }
        if(this.hub.state == State.ActiveSession.LastActiveState){
            State.ActiveSession.LastActiveState = null;
        }
        if(this.hub == State.ActiveSession.HubSelectedForConnectA){
            State.ActiveSession.HubSelectedForConnectA = null;
        }
        if(this.hub == State.ActiveSession.HubSelectedForConnectB){
            State.ActiveSession.HubSelectedForConnectB = null;
        }
        this.markerDraggable = false;
        this.showEditForm = false;
        this.showSpeedDialMenu1 = false;
        this.showSpeedDialMenu2 = false;
        this.showSpeedDialMenu3 = false;
        if (State.ActiveSession.LastActiveState !== null && State.ActiveSession.LastActiveState !== this) {
            State.ActiveSession.LastActiveState.Reset();
        }
        return true;
    }
    CreateOrganization() {
        let hub = new Hub();
        hub.type = "group_organization";
        Vue.nextTick(() => {
            hub.state.EditForm();
            State.ActiveSession.HubSelectedForConnectA = this.hub;
            State.ActiveSession.HubSelectedForConnectB = hub;
        });
    }
    Remove() {
        this.Reset();
        this.hub.Remove();
        State.ActiveSession.LastActiveState = null;
    }
    EditForm() {
        this.showEditForm = false;
        setTimeout(() => {
            this.showEditForm = true;
        },100);
    }
    Clone() {
        this.Reset();
        this.hub.Clone(true);
        State.ActiveSession.LastActiveState = this;
    }
    SpeedDialMenu1() {
        this.Reset();
        State.ActiveSession.HubSelectedForConnectA = this.hub;
        this.showSpeedDialMenu1 = true;
        State.ActiveSession.LastActiveState = this;
    }
    SpeedDialMenu2() {
        this.Reset();
        State.ActiveSession.HubSelectedForConnectA = this.hub;
        this.showSpeedDialMenu2 = true;
        State.ActiveSession.LastActiveState = this;
    }
    SpeedDialMenu3() {
        this.Reset();
        State.ActiveSession.HubSelectedForConnectA = this.hub;
        this.showSpeedDialMenu3 = true;
        State.ActiveSession.LastActiveState = this;
    }
}