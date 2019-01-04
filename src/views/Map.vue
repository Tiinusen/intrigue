<template>
  <div class="maximize">
    <AvatarDesigner ref="AvatarDesigner"/>
    <l-map
      class="maximize"
      :zoom="20"
      :maxZoom="20"
      :minZoom="20"
      :options="{zoomControl: false}"
      :ontouchstart="proxy(onMap, null)"
      :ontouchend="proxy(onMap, 50)"
      :onmousedown="proxy(onMap, null)"
      :onmouseup="proxy(onMap, 50)"
      @click="onSetCursorCoordinate"
    >
      <!-- Markers -->
      <l-marker :key="hub.key" v-for="hub in hubs" :lat-lng.sync="hub.latlng">
        <l-icon :icon-anchor="[50, 60]">
          <Avatar
            class="marker-icon"
            v-show="hub.hubType === 'Character'"
            avatarStyle="Circle"
            :avatar="hub.avatar"
            :onmouseup="proxy(onHubClick,0, hub)"
          />
          <v-img
            class="marker-icon"
            v-show="hub.hubType !== 'Character'"
            avatarStyle="Circle"
            :onmouseup="proxy(onHubClick,0, hub)"
          />
        </l-icon>
      </l-marker>

      <!-- Cursor -->
      <l-marker :lat-lng.sync="cursorPosition" v-if="showCursor">
        <l-icon :icon-anchor="[50, 60]">
          <v-speed-dial
            v-model="showCursor"
            :top="false"
            :bottom="false"
            :right="false"
            :left="false"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'"
          >
            <v-btn fab dark large color="red" v-bind:onmousedown="proxy(onAddOrganization)">
              <v-icon class="fas fa-campground" title="Add Organization"></v-icon>
            </v-btn>
            <v-btn fab dark large color="orange" v-bind:onmousedown="proxy(onAddPlace)">
              <v-icon class="fas fa-map" title="Add Place"></v-icon>
            </v-btn>
            <v-btn fab dark large color="blue" v-bind:onmousedown="proxy(onAddEvent)">
              <v-icon class="fas fa-book" title="Add Event"></v-icon>
            </v-btn>
            <v-btn fab dark large color="green" v-bind:onmousedown="proxy(onAddCharacter)">
              <v-icon class="fas fa-user" title="Add Character"></v-icon>
            </v-btn>
          </v-speed-dial>
          <Avatar
            style="width:100px;height:117px;"
            avatarStyle="Circle"
            :onmouseup="proxy(onCursorClick,100)"
          />
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import Vue from "vue";
import { LMap, LMarker, LTileLayer, LIcon, LControl } from "vue2-leaflet";
import { WasProxyActiveRecently, proxy } from "../utils/Proxy";
import Avatar from "../components/Avatar";
import { Hub } from "../models/Hub";
import AvatarDesigner from "../dialogs/AvatarDesigner";
import { Copy } from "../utils/Entity";
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControl,
    Avatar,
    AvatarDesigner
  },
  methods: {
    proxy,
    async onAddOrganization(event) {
      let hub = new Hub({
        hubType: "Organization / Group",
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      this.showCursor = false;
      this.$store.commit(hub);
    },
    onAddPlace() {
      this.showCursor = false;
      let hub = new Hub({
        hubType: "Place",
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      this.showCursor = false;
      this.$store.commit(hub);
    },
    onAddEvent() {
      this.showCursor = false;
      let hub = new Hub({
        hubType: "Event",
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      this.showCursor = false;
      this.$store.commit(hub);
    },
    async onAddCharacter(event) {
      this.showCursor = false;
      let hub = new Hub({
        hubType: "Character",
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      let changes = await this.$root.AvatarDesigner.open(hub.avatar);
      this.showCursor = false;
      Copy(hub.avatar, changes, Object.keys(changes));
      this.$store.commit(hub);
    },
    async onHubClick(hub) {
      this.showCursor = false;
      let changes = await this.$root.AvatarDesigner.open(hub.avatar);
      this.showCursor = false;
      this.$store.dispatch("session/hub", {
        id: hub.id,
        avatar: { ...changes }
      });
    },
    // This part below is to deal with click and touch events not fireing correctly
    onSetCursorCoordinate(event) {
      this.mapLastMouseDown = new Date();
      this.lastCursorClickPosition = event.latlng;
      this.onMap({ type: "mouseup" });
    },
    onMap(event) {
      switch (event.type) {
        case "touchstart":
        case "mousedown":
          this.mapLastMouseDown = new Date();
          break;
        case "touchend":
        case "mouseup":
          if (
            this.lastCursorClickPosition.lat === null ||
            this.lastCursorClickPosition.lng === null ||
            new Date().getTime() - this.mapLastMouseDown.getTime() > 500
          ) {
            return; // Don't do any actions if no new coordinates has been set (this due to problems with button interaction on the map)
          }
          this.showCursor = false;
          setTimeout(() => {
            this.cursorPosition.lat = this.lastCursorClickPosition.lat;
            this.cursorPosition.lng = this.lastCursorClickPosition.lng;
            this.lastCursorClickPosition.lat = null;
            this.lastCursorClickPosition.lng = null;
            this.showCursor = true;
          }, 20);
          break;
      }
    },
    onCursorClick() {
      Vue.nextTick(() => {
        this.showCursor = false;
      });
    }
  },
  data() {
    return {
      mapLastMouseDown: new Date(),
      lastCursorClickPosition: {
        lat: 0,
        lng: 0
      },
      cursorPosition: {
        lat: 0,
        lng: 0
      },
      hubs: this.$store.state.session.hubs,
      showCursor: false,
      showCreationSpeedDial: false,
      showHubSpeedDial: false,
      wasMapClickedRecently: false
    };
  },
  mounted() {
    Vue.nextTick(() => {
      this.$root.AvatarDesigner = this.$refs.AvatarDesigner;
    });
  }
};
</script>
<style scoped>
.maximize {
  width: 100%;
  height: 100%;
}
.marker-icon {
  width: 100px;
  height: 117px;
}
</style>