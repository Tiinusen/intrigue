<template>
  <v-app :dark="isDarkThemeEnabled">
    <save-load ref="SaveLoad"/>
    <privacy-policy ref="PrivacyPolicy"/>
    <preferences ref="Preferences"/>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span style="color:red;">Intrigue</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu bottom left v-show="!loading && !isLoading" style="z-index:3000;">
        <v-btn slot="activator" :dark="isDarkThemeEnabled" icon>
          <v-icon class="fas fa-ellipsis-v"/>
        </v-btn>
        <v-list>
          <v-list-tile @click="onSignInClick" v-show="!isSignedIn">
            <v-list-tile-title>Sign in (Google Drive)</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSignOutClick" v-show="isSignedIn">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + P"
            @click="onPreferencesClick"
            v-shortkey="['ctrl', 'p']"
            @shortkey.native="onPreferencesClick()"
            v-show="isSignedIn"
          >
            <v-list-tile-title>Preferences</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSaveLoadClick" :disabled="!isSignedIn || (isEmpty && !hasFiles)">
            <v-list-tile-title>Save / Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + S"
            @click="onQuickSave"
            v-shortkey="['ctrl', 's']"
            @shortkey.native="onQuickSave()"
            v-show="isFileLoaded && !isEmpty && isSignedIn"
          >
            <v-list-tile-title>Quick Save</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + L"
            @click="onQuickLoad"
            v-shortkey="['ctrl', 'l']"
            @shortkey.native="onQuickLoad()"
            v-show="isFileLoaded && isSignedIn"
          >
            <v-list-tile-title>Quick Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            title="Keyboard Shortcut: CTRL + U"
            @click="onToggleAutoSync"
            v-shortkey="['ctrl', 'u']"
            @shortkey.native="onToggleAutoSync()"
            v-show="isFileLoaded && isSignedIn"
          >
            <v-list-tile-title v-show="!isAutoSyncEnabled">Enable AutoSync</v-list-tile-title>
            <v-list-tile-title v-show="isAutoSyncEnabled">Disable AutoSync</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="newSession" :disabled="isEmpty">
            <v-list-tile-title>New Session</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onToggleFullscreen">
            <v-list-tile-title>{{ fullscreen ? "Exit" : "Enter" }} Fullscreen</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer class="pa-3" v-show="isLoading || loading">
      <v-progress-linear :indeterminate="true" :color="isDarkThemeEnabled?'white':'black'"></v-progress-linear>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import SaveLoad from "./dialogs/SaveLoad";
import PrivacyPolicy from "./dialogs/PrivacyPolicy";
import Preferences from "./dialogs/Preferences";

function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

export default {
  name: "app",
  components: {
    SaveLoad,
    PrivacyPolicy,
    Preferences
  },
  data() {
    return {
      loading: true,
      fullscreen: false,
      gconfig: {
        apiKey: "AIzaSyDboMfF7p2eXT5Jlpv_6ZdjP7VOlOdpwZI",
        appId: "465407703204",
        clientId:
          "465407703204-4uhlqqnlit3rb2akncqfldur2pg0bp2l.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
        ],
        scope: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.appdata"
        ].join(" ")
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
      isLoading: "google/isLoading",
      isEmpty: "session/isEmpty",
      isDarkThemeEnabled: "preferences/isDarkThemeEnabled"
    })
  },
  methods: {
    onToggleFullscreen() {
      this.fullscreen = !this.fullscreen;
      if (this.fullscreen) {
        launchIntoFullscreen(document.getElementsByTagName("body")[0]);
      } else {
        exitFullscreen();
      }
    },
    async onPreferencesClick() {
      if (!this.isSignedIn) {
        return;
      }
      await this.$root.Preferences.open();
      await this.$store.dispatch("google/saveUserData");
    },
    async onQuickLoad() {
      if (!this.isFileLoaded) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch("google/load", {
        fileId: this.$store.state.google.loadedFileId
      });
      this.loading = false;
    },
    async onQuickSave() {
      if (!this.isFileLoaded) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch("google/save", {
        fileId: this.$store.state.google.loadedFileId
      });
      this.loading = false;
    },
    async onToggleAutoSync() {
      if (!this.isFileLoaded) {
        return;
      }
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
    newSession(){
      if (!confirm("Are you sure you wish to create a new session?")) {
        return;
      }
      this.$store.dispatch("google/new");
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
      this.$root.SaveLoad = this.$refs.SaveLoad;
      this.$root.PrivacyPolicy = this.$refs.PrivacyPolicy;
      this.$root.Preferences = this.$refs.Preferences;
    });
    this.$root.UpdateModifiedOnSession = () => {
      this.$store.commit("google/setSessionLastModified", new Date());
    };
    this.loading = true;
    await this.$store.dispatch("google/new");
    await this.$store.dispatch("google/initialize", this.gconfig);
    this.$root.activeScene = this.$store.state.session.ids["Scene#MAIN"];
    this.loading = false;
    if (this.isSignedIn) {
      if (this.hasAppData) {
        await this.$root.Preferences.open();
      } else if (this.hasFiles && !this.isFileLoaded) {
        await this.$root.SaveLoad.open();
      }
    }
  }
};
</script>
