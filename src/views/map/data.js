import { Scene } from '../../models/Scene'
export default function data() {
    return {
        lastCursorClickPosition: {
            lat: 0,
            lng: 0
        },
        clearCursorTimeout: null,
        keepCursorHidden: false,
        cursorPosition: {
            lat: 0,
            lng: 0
        },
        scenes: this.$store.state.session.scenes,
        activeScene: this.$store.state.session.ids["Scene#MAIN"],
        selectedHub: null,
        showWelcomePrompt: true,
        draggable: true,
        mapHubClickResolve: null,
        mapHubClickReject: null,
        hubConfirmResolve: null,
        hubConfirmReject: null,
    };
}