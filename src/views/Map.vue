<template>
  <div class="maximize">
    <!-- Dialogs -->
    <avatar-designer ref="AvatarDesigner"/>
    <sub-type-selector ref="SubTypeSelector"/>
    <link-type-selector ref="LinkTypeSelector"/>
    <hub-edit ref="HubEdit"/>
    <!-- Map -->
    <l-map
      class="maximize map"
      :zoom="20"
      :maxZoom="20"
      :minZoom="20"
      :options="{zoomControl: false, attributionControl: false}"
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
        :lineThickness="link.lineThickness"
      ></l-polygon>
      <!-- Hubs -->
      <l-marker
        :key="hub.key"
        v-for="hub in hubs"
        :lat-lng="hub.latlng"
        @update:latLng="onMarkerDragComplete(hub, $event)"
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
            <v-btn
              fab
              dark
              large
              color="red"
              v-bind:onmousedown="proxy(onAddOrganization)"
              title="Add Organization"
            >
              <img class="speed-dial-icon" contain src="/icons/group/organization.png" />
            </v-btn>
            <v-btn
              fab
              dark
              large
              color="orange"
              v-bind:onmousedown="proxy(onAddPlace)"
              title="Add Place"
            >
              <v-icon class="fas fa-map"></v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              large
              color="blue"
              v-bind:onmousedown="proxy(onAddEvent)"
              title="Add Event"
            >
              <v-icon class="fas fa-book"></v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              large
              color="green"
              v-bind:onmousedown="proxy(onAddCharacter)"
              title="Add Character"
            >
              <v-icon class="fas fa-user"></v-icon>
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

import Avatar from "../components/Avatar";

import AvatarDesigner from "../dialogs/AvatarDesigner";
import SubTypeSelector from "../dialogs/SubTypeSelector";
import LinkTypeSelector from "../dialogs/LinkTypeSelector";
import HubEdit from "../dialogs/HubEdit";

import methods from "./map/methods";
import data from "./map/data";
import computed from "./map/computed";

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
    LPolygon,
    HubEdit
  },
  data,
  methods,
  computed,
  mounted() {
    Vue.nextTick(() => {
      this.$root.AvatarDesigner = this.$refs.AvatarDesigner;
      this.$root.SubTypeSelector = this.$refs.SubTypeSelector;
      this.$root.LinkTypeSelector = this.$refs.LinkTypeSelector;
      this.$root.HubEdit = this.$refs.HubEdit;
    });
  }
};
</script>
<style scoped>
.map {
  background-color: transparent;
}
.maximize {
  width: 100%;
  height: 100%;
}
.marker-icon {
  width: 100px;
  height: 117px;
}
.speed-dial-icon{
  width:3em;
  height:3em;
  bottom:0.2em;
  position: relative;
}
</style>