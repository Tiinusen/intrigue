export default {
    draggable(val) {
        if (val) {
            this.$root.Leaflet.mapObject.dragging.enable()
        } else {
            this.$root.Leaflet.mapObject.dragging.disable()
        }
    }
};