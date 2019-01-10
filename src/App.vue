<template>
  <v-app>
    <GooglePicker :gconfig="gconfig" ref="GooglePicker"/>
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
          <v-list-tile @click="onSignInClick" v-if="!$store.state.google.isSignedIn">
            <v-list-tile-title>Sign in (Google Drive)</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSignOutClick" v-if="$store.state.google.isSignedIn">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onLoadClick" :disabled="!$store.state.google.isSignedIn">
            <v-list-tile-title>Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSaveClick" :disabled="!$store.state.google.isSignedIn">
            <v-list-tile-title>Save</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onSaveAsClick" :disabled="!$store.state.google.isSignedIn">
            <v-list-tile-title>Save as ...</v-list-tile-title>
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
export default {
  name: "app",
  components: {
    GooglePicker
  },
  data() {
    return {
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
    onSignInClick() {
      this.$store.dispatch("google/signIn");
    },
    onSignOutClick() {
      this.$store.dispatch("google/signOut");
    },
    async onLoadClick() {
      let fileId = await this.$root.GooglePicker.open("*.intrigue");
      if(fileId !== null){
        this.$store.dispatch("google/load", fileId);
      }
    },
    async onSaveClick() {
      let fileId = await this.$root.GooglePicker.open("*.intrigue");
      if(fileId !== null){
        this.$store.dispatch("google/save", fileId);
      }
    },
    onSaveAsClick() {
      this.$store.dispatch("google/save");
    }
  },
  mounted() {
    Vue.nextTick(() => {
      this.$store.dispatch("google/initialize", this.gconfig);
      this.$root.GooglePicker = this.$refs.GooglePicker;
    });
  }
};
</script>
