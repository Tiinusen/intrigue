<template>
  <!-- Cursor -->
  <l-polygon v-if="show"
  :lat-lngs="latlngs"
  :color="link.color"
  ></l-polygon>
</template>

<script>
import { LPolygon, LIcon } from "vue2-leaflet";
import { proxy } from "../utils/Proxy";

export default {
  components: {
    LPolygon,
    LIcon
  },
  props: ["link", "p1", "p2"],
  data() {
    return {};
  },
  methods: {
    proxy
  },
  computed: {
    latlngs() {
      if (typeof this.p1 === "undefined" || this.p1 === null) {
        return [[0, 0], [0, 0]];
      } else if (typeof this.p2 === "undefined" || this.p2 === null) {
        return [[0, 0], [0, 0]];
      }
      return [this.p1, this.p2];
    },
    show() {
      return false;
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
