<template>
  <v-app>
    <vue-headful
      title="Intrigue Map"
      description="Intrigue Map is a tool dedicated to game masters of Kult Divinity Lost"
    />
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Intrigue</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu bottom left>
        <v-btn slot="activator" light icon>
          <v-icon class="fas fa-ellipsis-v"/>
        </v-btn>

        <v-list>
          <v-list-tile @click="onSaveLoadClick">
            <v-list-tile-title>Save / Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onClearClick">
            <v-list-tile-title>Clear</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import vueHeadful from "vue-headful";
import { State } from "./models/Session";
export default {
  name: "IntrigueMap",
  data: function() {
    return {};
  },
  components: {
    vueHeadful
  },
  methods: {
    onSaveLoadClick() {
      State.ActiveSession.Cursor.ShowCursor = false;
      State.ActiveSession.ShowSaveLoadDialog = true;
      setTimeout(() => {
        State.ActiveSession.Cursor.ShowCursor = false;
      }, 10);
    },
    onClearClick() {
      if (!confirm("Do you really want to clear the whole intrigue map?")) {
        return;
      }
      State.ActiveSession.Init();
      setTimeout(() => {
        State.ActiveSession.Cursor.ShowCursor = false;
      }, 10);
    }
  }
};
</script>
