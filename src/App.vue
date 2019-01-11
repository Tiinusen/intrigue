<template>
  <v-app dark>
    <google-picker :gconfig="gconfig" ref="GooglePicker"/>
    <save-load ref="SaveLoad"/>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Intrigue</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu bottom left v-show="!loading">
        <v-btn slot="activator" dark icon>
          <v-icon class="fas fa-ellipsis-v"/>
        </v-btn>
        <v-list>
          <v-list-tile @click="onSignInClick" v-if="!$store.state.google.isSignedIn">
            <v-list-tile-title>Sign in (Google Drive)</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSignOutClick" v-if="$store.state.google.isSignedIn">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            @click="onSaveLoadClick"
            :disabled="!$store.state.google.isSignedIn || ($store.state.session.hubs.length === 0 && $store.state.google.files.length === 0)"
          >
            <v-list-tile-title>Save / Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onClearClick" :disabled="$store.state.session.hubs.length === 0">
            <v-list-tile-title>Clear Intrigue Map</v-list-tile-title>
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
import Vue from "vue";
import GooglePicker from "./dialogs/GooglePicker";
import SaveLoad from "./dialogs/SaveLoad";
export default {
  name: "app",
  components: {
    GooglePicker,
    SaveLoad
  },
  data() {
    return {
      loading: true,
      gconfig: {
        apiKey: "AIzaSyDboMfF7p2eXT5Jlpv_6ZdjP7VOlOdpwZI",
        appId: "465407703204",
        clientId:
          "465407703204-4uhlqqnlit3rb2akncqfldur2pg0bp2l.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
        ],
        scope: ["https://www.googleapis.com/auth/drive"].join(" ")
      }
    };
  },
  methods: {
    onClearClick() {
      if (!confirm("Are you sure you wish to clear the Intrigue Map?")) {
        return;
      }
      this.$store.dispatch("session/clear");
    },
    onSignInClick() {
      this.$store.dispatch("google/signIn");
    },
    onSignOutClick() {
      this.$store.dispatch("google/signOut");
    },
    async onSaveLoadClick() {
      await this.$root.SaveLoad.open();
    }
  },
  async mounted() {
    Vue.nextTick(() => {
      this.$root.GooglePicker = this.$refs.GooglePicker;
      this.$root.SaveLoad = this.$refs.SaveLoad;
    });
    this.loading = true;
    await this.$store.dispatch("google/initialize", this.gconfig);
    this.loading = false;
    if (
      this.$store.state.google.isSignedIn &&
      this.$store.state.google.files.length > 0
    ) {
      this.$root.SaveLoad.open();
    }
  }
};
</script>
