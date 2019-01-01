<template>
  <l-marker
    v-if="State.ActiveSession.Cursor.ShowCursor"
    :lat-lng.sync="State.ActiveSession.Cursor.Position"
    @click="onclick"
  >
    <l-icon :icon-anchor="[50, 60]">
      <div style="position:absolute;">
        <v-icon class="fas fa-plus-circle"></v-icon>
      </div>
      <v-speed-dial
        v-model="State.ActiveSession.Cursor.ShowCursor"
        :top="false"
        :bottom="false"
        :right="false"
        :left="false"
        :direction="'top'"
        :open-on-hover="true"
        :transition="'slide-y-reverse-transition'"
      >
        <v-btn fab dark large color="red" v-bind:onmousedown="addOrganizationButtonCMD">
          <v-icon class="fas fa-campground" title="Add related Organization"></v-icon>
        </v-btn>
        <v-btn fab dark large color="orange" v-bind:onmousedown="addPlaceButtonCMD">
          <v-icon class="fas fa-map" title="Add related Place"></v-icon>
        </v-btn>
        <v-btn fab dark large color="blue" v-bind:onmousedown="addEventButtonCMD">
          <v-icon class="fas fa-book" title="Add related Event"></v-icon>
        </v-btn>
        <v-btn fab dark large color="green" v-bind:onmousedown="addCharacterButtonCMD">
          <v-icon class="fas fa-user" title="Add related Character"></v-icon>
        </v-btn>
      </v-speed-dial>
      <Avatar @click="State.ActiveSession.Cursor.Reset()" style="width:100px;height:117px;"/>
    </l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from "vue2-leaflet";
import { State } from "../models/Session";
import Avatar from "./Avatar";
export default {
  props: [],
  components: {
    LMarker,
    LIcon,
    Avatar
  },
  data() {
    return {
      State: State,
      addOrganizationButtonCMD:
        "State.ActiveSession.Cursor.CreateOrganization()",
      addPlaceButtonCMD:
        "State.ActiveSession.Cursor.CreatePlace()",
      addCharacterButtonCMD:
        "State.ActiveSession.Cursor.CreateCharacter()",
      addEventButtonCMD:
        "State.ActiveSession.Cursor.CreateEvent()",
    };
  },
  methods: {
    ondragend() {
      // this.hub.state.Reset();
    },
    onclick() {
      State.ActiveSession.Cursor.Reset();
    }
  }
};
</script>