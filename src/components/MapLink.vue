<template>
  <l-polygon v-if="show" :lat-lngs="latlngs" :color="link.color" :weight="link.linkThickness * 5"></l-polygon>
</template>

<script>
import { LPolygon, LIcon, LMarker } from "vue2-leaflet";
import { proxy } from "../utils/Proxy";

export default {
  components: {
    LMarker,
    LPolygon,
    LIcon
  },
  props: ["link", "p1", "p2", "label"],
  data() {
    return {};
  },
  methods: {
    proxy
  },
  computed: {
    latlngs() {
      if (!this.show) {
        return [[0, 0], [0, 0]];
      }
      return [this.p1, this.p2];
    },
    show() {
      if (typeof this.p1 === "undefined" || this.p1 === null) {
        return false;
      } else if (typeof this.p2 === "undefined" || this.p2 === null) {
        return false;
      }
      return true;
    },
    text() {
      if (!this.show) {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.cursor-image {
  width: 100px;
  height: 100px;
}

.cursor-sheet {
  position: relative;
  bottom: 125px;
  right: 25px;
  background-color: transparent;
}
</style>
