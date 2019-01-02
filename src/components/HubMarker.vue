<template>
  <div>
    <l-marker
      v-if="typeof hub.state !== 'undefined'"
      :lat-lng.sync="hub.position"
      @dragend="ondragend"
      @click="onclick"
      :draggable="hub.state.markerDraggable"
    >
      <l-icon :icon-anchor="[50, 60]">
        <HubActions v-bind:hub="hub"></HubActions>
        <div style="position:absolute;">
          <v-icon v-if="hub.state.markerDraggable" class="fas fa-arrows-alt"></v-icon>
        </div>
        <Avatar
          v-if="hub.type == 'character'"
          style="width:100px;height:117px;"
          v-bind:avatar="hub.avatar"
        />
        <v-img
          v-if="hub.type !== 'character'"
          :src="hub.image"
          style="width:100px;height:100px"
          contain
        />
        <div fas class="text-xs-center" style="width:100px;background-color:#fafafa;border:thin solid black;position:relative;top:-10px;">
            {{ hub.name }}
        </div>
      </l-icon>
    </l-marker>
    <slot></slot>
  </div>
</template>

<script>
import { LMarker, LIcon, LPolyline } from "vue2-leaflet";
import { State } from "../models/Session";
import Avatar from "./Avatar";
import HubActions from "./HubActions";
import Vue from "vue";
export default {
  props: ["hub"],
  components: {
    LMarker,
    LIcon,
    LPolyline,
    Avatar,
    HubActions
  },
  computed: {
    MarkedForConnect() {
      return State.ActiveSession.HubSelectedForConnectA == this.hub;
    }
  },
  methods: {
    ondragend() {
      // this.hub.state.Reset();
    },
    onclick() {
      if (State.ActiveSession.LastActiveState !== null) {
        let lastActive = State.ActiveSession.LastActiveState;
        State.ActiveSession.LastActiveState.Reset();
        State.ActiveSession.LastActiveState = null;
        if (lastActive === this.hub.state) {
          return;
        } else {
          State.ActiveSession.HubSelectedForConnectA = lastActive.hub;
          State.ActiveSession.HubSelectedForConnectB = this.hub;
          State.ActiveSession.ShowConnectDialog = true;
        }
      }
      this.hub.state.Reset();
      State.ActiveSession.LastActiveState = null;

      if (State.ActiveSession.HubSelectedForConnectA !== null) {
        if (State.ActiveSession.HubSelectedForConnectA === this.hub) {
          State.ActiveSession.HubSelectedForConnectA = null;
          State.ActiveSession.HubSelectedForConnectB = null;
          return;
        }
        State.ActiveSession.HubSelectedForConnectB = this.hub;
        State.ActiveSession.ShowConnectDialog = true;
        return;
      }
      Vue.nextTick(() => {
        State.ActiveSession.LastActiveState = this.hub.state;
        this.hub.state.showSpeedDialMenu1 = true;
        this.hub.state.markerDraggable = true;
        State.ActiveSession.HubSelectedForConnectA = this.hub;
      }, 100);
    }
  }
};
</script>