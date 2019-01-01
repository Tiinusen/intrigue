<template>
  <l-polygon :lat-lngs="LatLng" :color="Color" :weight="link.Importance*15"></l-polygon>
</template>

<script>
import { LMarker, LIcon, LPolygon } from "vue2-leaflet";
// import { State } from "../models/Session";
export default {
  props: ["link"],
  components: {
    LMarker,
    LIcon,
    LPolygon
  },
  computed: {
    DisplayLink() {
      return true;
    },
    Color(){
        return "Red";
    },
    LatLng() {
      return [this.link.HubA.position, this.link.HubB.position];
    }
  },
  methods: {}
};
</script>