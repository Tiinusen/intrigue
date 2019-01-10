export default function data() {
    return {
        TRUE: true, // To force components relying on v-model to be viewed (commonly used with v-if="something else")
        mapLastMouseDown: new Date(),
        cursorLastHidden: new Date(), // Also a workaround to try to solve the timing issues with leaflet events
        lastCursorClickPosition: {
            lat: 0,
            lng: 0
        },
        cursorPosition: {
            lat: 0,
            lng: 0
        },
        hubs: this.$store.state.session.hubs,
        links: this.$store.state.session.links,
        showCursor: false,
        showCreationSpeedDial: false,
        showHubSpeedDial: 1,
        wasMapClickedRecently: false,
        selectedHubA: null,
        selectedHubB: null,
        showWelcomePrompt: true
    };
}