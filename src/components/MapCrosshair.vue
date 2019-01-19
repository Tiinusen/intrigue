<template>
  <l-marker
    :lat-lng="latlng"
    @click="$emit('click', $event)"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    v-if="visible"
    :zIndexOffset="3000"
  >
    <l-icon :icon-anchor="[50, 50]">
      <v-img src="/cursor.png" class="cursor-image"/>
      <v-sheet height="150" width="150" class="cursor-sheet">
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Entity"
          style="left:-25px;top:-25px;"
          :onclick="proxy(onEntityClick)"
        >
          <v-icon class="fas fa-user" style="color:red !important"></v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Place"
          style="left:100px;top:-25px;"
          :onclick="proxy(onPlaceClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/place.png" style="width:50px;">
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Event"
          style="left:100px;top:100px;"
          :onclick="proxy(onEventClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/event.png" style="width:50px;">
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Group"
          style="left:-25px;top:100px;"
          :onclick="proxy(onGroupClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/group.png" style="width:50px;">
        </v-btn>
      </v-sheet>
    </l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from "vue2-leaflet";
import { proxy } from "../utils/Proxy";

export default {
  components: {
    LMarker,
    LIcon
  },
  props: ["latlng", "visible"],
  data() {
    return {};
  },
  methods: {
    proxy,
    onEntityClick(){
      this.$emit('click:entity');
    },
    onPlaceClick(){
      this.$emit('click:place');
    },
    onGroupClick(){
      this.$emit('click:group');
    },
    onEventClick(){
      this.$emit('click:event');
    }
  },
  computed: {
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
