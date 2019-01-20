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

      <!-- Map Hubs -->
      <map-hub
        v-for="(hubP, n) in activeScene.hubs"
        :key="'MapHub#'+n"
        :hubP="hubP"
        @click="onHubClick(hubP.hub)"
        @mousedown="disableDraggable"
        @mouseup="enableDraggable"
        @update="onHubDragged(hubP.hub, $event)"
        @click:edit="editHub"
        @click:delete="deleteHub"
        @click:link="createRemoveLink"
        @click:wizard="wizardHub"
        @click:confirm="confirmHub"
        :selected="selectedHub === hubP.hub"
      />
      <!-- Map Links -->
      <map-link
        v-for="(maplink, n) in maplinks"
        :key="'MapLink#'+n"
        :p1="maplink.p1"
        :p2="maplink.p2"
        :label="maplink.text"
        :link="maplink.link"
      />

      <!-- Crosshair -->
      <map-crosshair
        :latlng="cursorPosition"
        :visible="isCursorMarkerVisible"
        @click="onCursorClick"
        @click:place="createPlaceHub"
        @click:place-building="createPlaceBuildingHub"
        @click:pc="createPCHub"
        @click:leader="createLeaderHub"
        @click:monster="createMonsterHub"
        @click:group="createGroupHub"
        @click:contact="createContactHub"
        @click:object="createObjectHub"
        @click:organization="createOrganizationHub"
        @click:event="createEventHub"
        @click:event-dark-secret="createEventDarkSecretHub"
        @mousedown="disableDraggable"
        @mouseup="enableDraggable"
      />
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
import MapHub from "../components/MapHub";
import MapLink from "../components/MapLink";
import MapCrosshair from "../components/MapCrosshair";

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
    LControlAttribution,
    HubEdit,
    MapHub,
    MapLink,
    MapCrosshair
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