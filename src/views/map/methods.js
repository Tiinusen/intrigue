import { Hub, HubTypes } from "../../models/Hub"
import { Link, LinkTypes } from "../../models/Link"
import { Scene } from "../../models/Scene"
import { WasProxyActiveRecently, proxy } from "../../utils/Proxy"

import { Copy } from "../../utils/Entity"

import Vue from "vue";

const HardcodedEventSleep = 1; // This delay is used to allow onMapClick and onHubClick to act first, and to avoid trigger accidents

export default {
    proxy,
    async createLink() {
        try {
            let hubA = this.selectedHub;
            await new Promise(resolve => setTimeout(resolve, HardcodedEventSleep));
            this.selectedHub = null;
            let hubB = await this.pickHub();
            if (hubA === hubB) {
                this.selectedHub = hubA;
                throw new Error("Cancelled");
            }
            let link = new Link();
            link.created = new Date(this.$store.state.session.time.getTime());
            link.hubA = hubA;
            link.hubB = hubB;
            await new Promise(resolve => setTimeout(resolve, HardcodedEventSleep));
            let linkType = await this.$root.LinkTypeSelector.open(link);
            if (linkType === null) {
                return;
            }
            link.ApplyLinkType(linkType);
            this.$store.dispatch(link);
            this.$root.UpdateModifiedOnSession();
            this.selectedHub = hubA;
        } catch (e) {

        }
    },
    async deleteHub(hub) {
        let answer = await this.promptYesNoHub();
        this.selectedHub = null;
        this.clearCursorMarker();
        if (!answer) {
            return;
        }
        await this.$store.dispatch("session/deleteHub", hub);
        this.$root.UpdateModifiedOnSession();
    },
    async editHub(hubO) {
        let hub = await this.$root.HubEdit.open(hubO);
        if (hub === null) { // Cancel
            return;
        }
        this.$store.dispatch(hub);
        this.selectedHub = hubO;
    },
    pickHub() {
        return new Promise((resolve, reject) => {
            this.mapHubClickResolve = resolve;
            this.mapHubClickReject = reject;
        });
    },
    async confirmHub(hub, answer){
        if(this.hubConfirmResolve !== null){
            let resolve = this.hubConfirmResolve;
            this.hubConfirmResolve = null;
            this.hubConfirmReject = null;
            resolve(answer);
        }
    },
    promptYesNoHub() {
        let hub = this.selectedHub;
        return new Promise(async (resolve, reject) => {
            this.disableDraggable();
            await new Promise(resolve => setTimeout(resolve, 1));
            this.selectedHub = hub;
            this.hubConfirmResolve = (result) => {
                this.enableDraggable();
                this.hubConfirmResolve = null;
                this.hubConfirmReject = null;
                resolve(result);
            };
            this.hubConfirmReject = () => {
                this.enableDraggable();
                this.hubConfirmResolve = null;
                this.hubConfirmReject = null;
                resolve(false);
            };
        });
    },
    async wizardHub() {
        let hubO = this.selectedHub;
        let hub = new Hub(hubO);
        await new Promise(resolve => setTimeout(resolve, HardcodedEventSleep));
        this.selectedHub = null;
        if (!(hub.hubType in HubTypes)) {
            return;
        }
        let isEntity = hub.hubType === "Entity";
        hub.hubType = await this.$root.SubTypeSelector.open(
            hub.hubType,
            HubTypes[hub.hubType]
        );
        if (isEntity) {
            let changes = await this.$root.AvatarDesigner.open(hub.avatar);
            Copy(hub.avatar, changes, Object.keys(changes));
        }
        await this.$store.dispatch(hub);
        this.selectedHub = hubO;
    },
    async createEntityHub() {
        let hub = new Hub({
            hubType: "Entity",
            created: new Date(this.$store.state.session.time.getTime()),
        });
        await this.$store.dispatch(hub);
        this.addHubToActiveScene(hub);
        this.selectedHub = hub;
        this.$root.UpdateModifiedOnSession();
    },
    async createPlaceHub() {
        let hub = new Hub({
            hubType: "Place",
            created: new Date(this.$store.state.session.time.getTime()),
        });
        await this.$store.dispatch(hub);
        this.addHubToActiveScene(hub);
        this.selectedHub = hub;
        this.$root.UpdateModifiedOnSession();
    },
    async createEventHub() {
        let hub = new Hub({
            hubType: "Event",
            created: new Date(this.$store.state.session.time.getTime()),
        });
        await this.$store.dispatch(hub);
        this.addHubToActiveScene(hub);
        this.selectedHub = hub;
        this.$root.UpdateModifiedOnSession();
    },
    async createGroupHub() {
        let hub = new Hub({
            hubType: "Group",
            created: new Date(this.$store.state.session.time.getTime()),
        });
        await this.$store.dispatch(hub);
        this.addHubToActiveScene(hub);
        this.selectedHub = hub;
        this.$root.UpdateModifiedOnSession();
    },
    async addHubToActiveScene(hub) {
        let scene = new Scene(this.activeScene);
        scene.AddHub(hub, this.cursorPosition.lat, this.cursorPosition.lng);
        await this.$store.dispatch(scene);
        this.$root.UpdateModifiedOnSession();
        this.clearCursorMarker();
    },
    async onCursorClick(event) {
        // Isn't doing anything at the moment
    },
    async onHubClick(hub, event) {
        this.clearCursorMarker();
        if (this.mapHubClickResolve !== null) {
            let resolve = this.mapHubClickResolve;
            this.mapHubClickResolve = null;
            this.mapHubClickReject = null;
            resolve(hub);
            return;
        } else if (this.hubConfirmResolve !== null) { // Ignore hub interaction
            return;
        }
        if (this.selectedHub === hub) {
            this.selectedHub = null;
        } else {
            this.selectedHub = hub;
        }
    },
    async onHubDragged(hub, latlng) {
        let scene = new Scene(this.activeScene);
        scene.AddHub(hub, latlng.lat, latlng.lng);
        await this.$store.dispatch(scene);
        this.$root.UpdateModifiedOnSession();
    },
    async onMapClick(event) {
        if (this.keepCursorHidden) {
            return;
        }
        if (this.hubConfirmResolve !== null) { // Ignore hub interaction
            return;
        }
        if (this.mapHubClickReject !== null) {
            let reject = this.mapHubClickReject;
            this.mapHubClickResolve = null;
            this.mapHubClickReject = null;
            reject(new Error("Hub click cancelled"));
            return;
        }
        this.selectedHub = null;
        this.lastCursorClickPosition.lat = event.latlng.lat;
        this.lastCursorClickPosition.lng = event.latlng.lng;
        this.cursorPosition.lat = this.lastCursorClickPosition.lat;
        this.cursorPosition.lng = this.lastCursorClickPosition.lng;
    },
    clearCursorMarker() {
        // the reason this is done this way is because there are some troubles with the leaflet event propagation
        if (this.clearCursorTimeout !== null) {
            clearTimeout(this.clearCursorTimeout);
        }
        this.keepCursorHidden = true;
        // Delays the reset since the onMapClick will be triggered instantly afterwards when an regular btn on a marker gets pressed
        // And that would make the cursor flicker for a moment, so this will add a delay before the cursor can be placed again
        this.clearCursorTimeout = setTimeout(() => {
            this.clearCursorTimeout = null;
            this.cursorPosition.lat = 0;
            this.cursorPosition.lng = 0;
            this.keepCursorHidden = false;
        }, 50);
    },
    disableDraggable() {
        this.draggable = false;
    },
    enableDraggable() {
        this.draggable = true;
    },
    testAlert() {
        alert(JSON.stringify(arguments));
    },
    testConsole() {
        console.log("testConsole():", arguments);
    }
};