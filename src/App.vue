<template>
  <v-app dark>
    <google-picker :gconfig="gconfig" ref="GooglePicker"/>
    <save-load ref="SaveLoad"/>
    <privacy-policy ref="PrivacyPolicy"/>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span style="color:red;">Intrigue</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu bottom left v-show="!loading">
        <v-btn slot="activator" dark icon>
          <v-icon class="fas fa-ellipsis-v"/>
        </v-btn>
        <v-list>
          <v-list-tile @click="onSignInClick" v-if="!isSignedIn">
            <v-list-tile-title>Sign in (Google Drive)</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSignOutClick" v-if="isSignedIn">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSaveLoadClick" :disabled="!isSignedIn || (isEmpty && !hasFiles)">
            <v-list-tile-title>Save / Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + S"
            @click="onQuickSave"
            v-shortkey="['ctrl', 's']"
            @shortkey.native="onQuickSave()"
            v-show="isFileLoaded && !isEmpty"
          >
            <v-list-tile-title>Quick Save</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + L"
            @click="onQuickLoad"
            v-shortkey="['ctrl', 'l']"
            @shortkey.native="onQuickLoad()"
            v-show="isFileLoaded"
          >
            <v-list-tile-title>Quick Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + U"
            @click="onToggleAutoSync"
            v-shortkey="['ctrl', 'u']"
            @shortkey.native="onToggleAutoSync()"
            v-show="isFileLoaded"
          >
            <v-list-tile-title v-show="!isAutoSyncEnabled">Enable AutoSync</v-list-tile-title>
            <v-list-tile-title v-show="isAutoSyncEnabled">Disable AutoSync</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onClearClick" :disabled="isEmpty">
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
import { mapGetters } from "vuex";
import GooglePicker from "./dialogs/GooglePicker";
import SaveLoad from "./dialogs/SaveLoad";
import PrivacyPolicy from "./dialogs/PrivacyPolicy";
export default {
  name: "app",
  components: {
    GooglePicker,
    SaveLoad,
    PrivacyPolicy
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
  computed: {
    ...mapGetters({
      hasFiles: "google/hasFiles",
      isAutoSyncEnabled: "google/isAutoSyncEnabled",
      isFileLoaded: "google/isFileLoaded",
      isInitialized: "google/isInitialized",
      isSignedIn: "google/isSignedIn",
      isEmpty: "session/isEmpty"
    })
  },
  methods: {
    async onQuickLoad() {
      this.loading = true;
      await this.$store.dispatch("google/load", {
        fileId: this.$store.state.google.loadedFileId
      });
      this.loading = false;
    },
    async onQuickSave() {
      this.loading = true;
      await this.$store.dispatch("google/save", {
        fileId: this.$store.state.google.loadedFileId
      });
      this.loading = false;
    },
    async onToggleAutoSync() {
      this.loading = true;
      await this.$store.dispatch("google/toggleAutoSync");
      this.loading = false;
    },
    onClearClick() {
      if (!confirm("Are you sure you wish to clear the Intrigue Map?")) {
        return;
      }
      this.$store.dispatch("session/clear");
    },
    async onSignInClick() {
      let accepted = await this.$root.PrivacyPolicy.open();
      if (!accepted) {
        return;
      }
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
      this.$root.PrivacyPolicy = this.$refs.PrivacyPolicy;
    });
    this.loading = true;
    await this.$store.dispatch("google/initialize", this.gconfig);
    this.loading = false;
    if (this.isSignedIn && this.hasFiles) {
      this.$root.SaveLoad.open();
    }
  }
};
</script>
