<template>
  <div class="maximize">
    <!-- Dialogs -->
    <AvatarDesigner ref="AvatarDesigner"/>
    <SubTypeSelector ref="SubTypeSelector"/>
    <LinkTypeSelector ref="LinkTypeSelector"/>
    <!-- Map -->
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
      <!-- Links -->
      <l-polygon
        :key="link.key"
        v-for="link in links"
        :lat-lngs="[[link.hubA.lat, link.hubA.lng],[link.hubB.lat, link.hubB.lng]]"
        :color="link.color"
      ></l-polygon>
      <!-- Hubs -->
      <l-marker
        :key="hub.key"
        v-for="hub in hubs"
        :lat-lng="hub.latlng"
        @update:latLng="onMarkerDragComplete"
        :draggable="selectedHubA === hub && showHubSpeedDial === 1"
      >
        <l-icon :icon-anchor="[50, 60]">
          <v-speed-dial
            v-model="TRUE"
            v-if="selectedHubA === hub && showHubSpeedDial === 1"
            :top="false"
            :bottom="false"
            :right="false"
            :left="false"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'"
          >
            <v-btn fab dark large color="blue" v-bind:onmousedown="proxy(onEditHub)">
              <v-icon class="fas fa-edit" title="Edit"></v-icon>
            </v-btn>
            <v-btn fab dark large color="red" v-bind:onmousedown="proxy(onDeleteHub)">
              <v-icon class="fas fa-trash" title="Delete"></v-icon>
            </v-btn>
          </v-speed-dial>
          <v-speed-dial
            v-model="TRUE"
            v-if="selectedHubA === hub && showHubSpeedDial === 2"
            :top="false"
            :bottom="false"
            :right="false"
            :left="false"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'"
          >
            <v-btn fab dark large color="red" v-bind:onmousedown="proxy(abortHub)">
              <v-icon class="fas fa-times" title="Abort"></v-icon>
            </v-btn>
            <v-btn fab dark large color="green" v-bind:onmousedown="proxy(onConfirmDeleteHub)">
              <v-icon class="fas fa-check" title="Confirm"></v-icon>
            </v-btn>
          </v-speed-dial>
          <v-speed-dial
            v-model="TRUE"
            v-if="selectedHubB === hub && showHubSpeedDial === 3"
            :top="false"
            :bottom="false"
            :right="false"
            :left="false"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'"
          >
            <v-btn fab dark large color="red" v-bind:onmousedown="proxy(abortHub)">
              <v-icon class="fas fa-times" title="Abort"></v-icon>
            </v-btn>
            <v-btn fab dark large color="green" v-bind:onmousedown="proxy(onAddLink)">
              <v-icon class="fas fa-link" title="Create Link"></v-icon>
            </v-btn>
          </v-speed-dial>
          <v-img class="marker-icon" :src="hub.url" :onmouseup="proxy(onHubClick,0, hub)" contain/>
        </l-icon>
      </l-marker>

      <!-- Cursor -->
      <l-marker :lat-lng.sync="cursorPosition" v-if="isCursorVisible">
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
            :onmouseup="proxy(onCursorClick)"
          />
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import Vue from "vue";
import {
  LMap,
  LMarker,
  LTileLayer,
  LIcon,
  LControl,
  LPolygon
} from "vue2-leaflet";
import { WasProxyActiveRecently, proxy } from "../utils/Proxy";
import Avatar from "../components/Avatar";
import { Hub, HubTypes } from "../models/Hub";
import { Link, LinkTypes } from "../models/Link";
import AvatarDesigner from "../dialogs/AvatarDesigner";
import SubTypeSelector from "../dialogs/SubTypeSelector";
import LinkTypeSelector from "../dialogs/LinkTypeSelector";
import { Copy } from "../utils/Entity";
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControl,
    Avatar,
    AvatarDesigner,
    SubTypeSelector,
    LinkTypeSelector,
    LPolygon
  },
  data() {
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
      selectedHubB: null
    };
  },
  methods: {
    proxy,
    onMarkerDragComplete(latlng) {
      this.hideCursor();
      if (this.selectedHubA === null) {
        return;
      }
      this.$store.dispatch("session/hub", {
        id: this.selectedHubA.id,
        lat: latlng.lat,
        lng: latlng.lng
      });
    },
    async onAddLink() {
      let link = new Link();
      link.hubA = this.selectedHubA;
      link.hubB = this.selectedHubB;
      this.hideCursor();
      let linkType = await this.$root.LinkTypeSelector.open(link);
      if (linkType === null) {
        return;
      }
      link.ApplyLinkType(linkType);
      this.$store.dispatch(link);
      this.hideCursor();
      this.selectedHubB = null;
      this.showHubSpeedDial = 1;
    },
    async onAddOrganization(event) {
      this.hideCursor();
      let hub = new Hub({
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      hub.hubType = await this.$root.SubTypeSelector.open(
        "Group",
        HubTypes["Group"]
      );
      this.$store.dispatch(hub);
    },
    async onAddPlace() {
      this.hideCursor();
      let hub = new Hub({
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      hub.hubType = await this.$root.SubTypeSelector.open(
        "Place",
        HubTypes["Place"]
      );
      this.$store.dispatch(hub);
    },
    async onAddEvent() {
      this.hideCursor();
      let hub = new Hub({
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      hub.hubType = await this.$root.SubTypeSelector.open(
        "Event",
        HubTypes["Event"]
      );
      this.$store.dispatch(hub);
    },
    async onAddCharacter(event) {
      this.hideCursor();
      let hub = new Hub({
        lat: this.cursorPosition.lat,
        lng: this.cursorPosition.lng
      });
      hub.hubType = await this.$root.SubTypeSelector.open(
        "Character",
        HubTypes["Character"]
      );
      let changes = await this.$root.AvatarDesigner.open(hub.avatar);
      Copy(hub.avatar, changes, Object.keys(changes));
      this.$store.dispatch(hub);
    },
    hideCursor() {
      this.lastCursorClickPosition.lat = null;
      this.lastCursorClickPosition.lng = null;
      this.showCursor = false;
      this.cursorLastHidden = new Date();
      Vue.nextTick(() => {
        this.lastCursorClickPosition.lat = null;
        this.lastCursorClickPosition.lng = null;
        this.showCursor = false;
        this.cursorLastHidden = new Date();
      });
    },
    onEditHub(hub) {
      this.hideCursor();
    },
    onDeleteHub(hub) {
      this.hideCursor();
      this.showHubSpeedDial = 2;
    },
    onConfirmDeleteHub(hub) {
      this.hideCursor();
      this.$store.dispatch("session/deleteHub", this.selectedHubA);
      this.abortHub();
    },
    abortHub() {
      this.hideCursor();
      this.showHubSpeedDial = 1;
      this.selectedHubA = null;
      this.selectedHubB = null;
    },
    async onHubClick(hub) {
      this.hideCursor();
      this.showHubSpeedDial = 1;
      if (this.selectedHubA === hub) {
        if (this.selectedHubB !== null) {
          this.selectedHubB = null;
        } else {
          this.selectedHubA = null;
        }
      } else if (this.selectedHubA !== null) {
        if (this.selectedHubB === hub) {
          this.selectedHubB = null;
          this.showHubSpeedDial = 1;
        } else {
          this.selectedHubB = hub;
          this.showHubSpeedDial = 3;
        }
      } else {
        this.selectedHubA = hub;
      }
    },
    // This part below is to deal with click and touch events not fireing correctly when inside a leaflet component
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
            new Date().getTime() - this.mapLastMouseDown.getTime() > 500 ||
            new Date().getTime() - this.cursorLastHidden.getTime() < 500
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
        this.hideCursor();
      });
    }
  },
  computed: {
    isCursorVisible() {
      return (
        this.showCursor &&
        this.cursorPosition.lat !== null &&
        this.cursorPosition.lng !== null
      );
    }
  },
  mounted() {
    Vue.nextTick(() => {
      this.$root.AvatarDesigner = this.$refs.AvatarDesigner;
      this.$root.SubTypeSelector = this.$refs.SubTypeSelector;
      this.$root.LinkTypeSelector = this.$refs.LinkTypeSelector;
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