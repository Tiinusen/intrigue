<template>
  <div class="maximize">
    <!-- Dialogs -->
    <avatar-designer ref="AvatarDesigner"/>
    <sub-type-selector ref="SubTypeSelector"/>
    <link-type-selector ref="LinkTypeSelector"/>
    <hub-edit ref="HubEdit"/>
    <!-- Map -->
    <l-map
      ref="Map"
      class="maximize map"
      :zoom="20"
      :maxZoom="20"
      :minZoom="20"
      :options="{zoomControl: false, attributionControl: false}"
      @click="onMapClick"
      @mouseup="enableDraggable"
    >
      <!-- StoryMode Component -->
      <l-control position="topleft">
        <story-mode
          @mousedown.native="disableDraggable();clearCursorMarker()"
          @mouseup.native="enableDraggable();clearCursorMarker()"
        />
      </l-control>

      <!-- Agreed Link and Text for Permission to use -->
      <l-control position="bottomleft">
        <a
          href="https://kultdivinitylost.com"
          style="color: red;font-weight:bold;text-decoration:none;"
          target="_blank"
        >With permission from Helmgast AB</a>
      </l-control>

      <!-- Hub Markers -->
      <hub-marker
        v-for="(hubP, n) in activeScene.hubs"
        :key="n"
        :hubP="hubP"
        @click="onHubClick(hubP.hub)"
        @mousedown="disableDraggable"
        @mouseup="enableDraggable"
        @update="onHubDragged(hubP.hub, $event)"
        @edit="editHub"
        @delete="deleteHub"
        @link="createLink"
        @wizard="wizardHub"
        @confirm="confirmHub"
        :selected="selectedHub === hubP.hub"
      />

      <!-- Cursor -->
      <l-marker
        :lat-lng="cursorPosition"
        @click="onCursorClick"
        @mousedown="disableDraggable"
        @mouseup="enableDraggable"
        v-if="isCursorMarkerVisible"
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
              :onclick="proxy(createEntityHub)"
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
              :onclick="proxy(createPlaceHub)"
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
              :onclick="proxy(createEventHub)"
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
              :onclick="proxy(createGroupHub)"
            >
              <img class="speed-dial-icon" contain src="/icons/group.png" style="width:50px;">
            </v-btn>
          </v-sheet>
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
  LPolygon,
  LControlAttribution
} from "vue2-leaflet";

import Avatar from "../components/Avatar";
import StoryMode from "../components/StoryMode";
import HubMarker from "../components/HubMarker";

import AvatarDesigner from "../dialogs/AvatarDesigner";
import SubTypeSelector from "../dialogs/SubTypeSelector";
import LinkTypeSelector from "../dialogs/LinkTypeSelector";
import HubEdit from "../dialogs/HubEdit";

import methods from "./map/methods";
import data from "./map/data";
import computed from "./map/computed";
import watch from "./map/watch";

export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControl,
    Avatar,
    StoryMode,
    AvatarDesigner,
    SubTypeSelector,
    LinkTypeSelector,
    LPolygon,
    LControlAttribution,
    HubEdit,
    HubMarker
  },
  data,
  methods,
  computed,
  watch,
  mounted() {
    Vue.nextTick(() => {
      this.$root.AvatarDesigner = this.$refs.AvatarDesigner;
      this.$root.SubTypeSelector = this.$refs.SubTypeSelector;
      this.$root.LinkTypeSelector = this.$refs.LinkTypeSelector;
      this.$root.HubEdit = this.$refs.HubEdit;
      this.$root.Leaflet = this.$refs.Map;
      this.$root.Map = this;
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

@media screen and (max-width: 500px) {
}
</style>