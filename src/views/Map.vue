<template>
  <l-map
    style="height: 100%; width: 100%"
    :zoom="20"
    :maxZoom="20"
    :minZoom="20"
    :options="{zoomControl: false}"
    @click="onclick"
  >
    <l-control position="topright">
      <HubDialog v-bind:hub="hub" v-for="hub in hubs" v-bind:key="hub.id+'KeyA'"></HubDialog>
      <LinkDialog/>
      <LoadSaveDialog v-bind:display="showSaveLoadDialog"/>
    </l-control>
    <!-- Hubs -->
    <HubMarker v-for="hub in hubs" v-bind:hub="hub" v-bind:key="hub.id+'KeyB'">
      <LinkMarker v-bind:link="link" v-bind:key="link.id" v-for="link in hub.links"/>
    </HubMarker>
    <!-- Hubs -->
    <CursorMarker/>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LIcon, LControl } from "vue2-leaflet";
import { State } from "../models/Session";
import HubMarker from "../components/HubMarker";
import CursorMarker from "../components/CursorMarker";
import { Hub } from "../models/Hub";
import HubDialog from "../components/HubDialog";
import LinkDialog from "../components/LinkDialog";
import LinkMarker from "../components/LinkMarker";
import LoadSaveDialog from "../components/LoadSaveDialog";
import Vue from "vue";

export default {
  components: {
    LMap,
    LTileLayer,
    LIcon,
    LControl,
    HubMarker,
    HubDialog,
    LinkDialog,
    LinkMarker,
    LoadSaveDialog,
    CursorMarker
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    onclick(event) {
      State.ActiveSession.Cursor.Show(event.latlng);
    }
  },
  data: function() {
    return {
      hubs: State.ActiveSession.Hubs,
      showSaveLoadDialog: false
    };
  }
};
</script>