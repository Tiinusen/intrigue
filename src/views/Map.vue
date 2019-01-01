<template>
  <l-map
    style="height: 100%; width: 100%"
    :zoom="20"
    :maxZoom="20"
    :minZoom="20"
    :center="[0, 0]"
    :options="{zoomControl: false}"
    @click="onclick"
  >
    <l-control position="topright">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <button
            class="fas fa-trash"
            style="font-size:5.5em;margin-right:0.5em"
            @click="onclear()"
            title="Clear"
          ></button>
          <button
            class="fas fa-save"
            style="font-size:6em;margin-right:0.3em"
            @click="onsaveload"
            title="Save Load"
          ></button>
        </v-layout>
      </v-container>
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
    },
    onclear() {
      if (!confirm("Do you really want to clear the whole intrigue map?")) {
        return;
      }
      State.ActiveSession.Init();
      setTimeout(() => {
        State.ActiveSession.Cursor.ShowCursor = false;
      }, 10);
    },
    onsaveload() {
      State.ActiveSession.Cursor.ShowCursor = false;
      State.ActiveSession.ShowSaveLoadDialog = true;
      setTimeout(() => {
        State.ActiveSession.Cursor.ShowCursor = false;
      }, 10);
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