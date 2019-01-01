<template>
  <v-dialog
    v-model="State.ActiveSession.ShowSaveLoadDialog"
    dark
    persistent
    max-width="600px"
    style="position:relative;z-index:2000;"
  >
  <br>
    <v-card>
      <v-btn dark fab absolute top right color="blue" @click="onclose" title="Close">
        <v-icon class="fas fa-times" style="margin-left:auto;margin-right:auto;"/>
      </v-btn>
      <v-card-title class="headline grey darken-2" primary-title>
        <v-icon class="fas fa-save" style="margin-right:0.5em;"/>Save / Load
      </v-card-title>
      <v-form @submit.prevent>
        <v-container>
          <v-layout row wrap>
            <v-flex xs10>
              <v-text-field xs2 v-model="inputName" label="Session Name" required></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn dark fab color="red" @click="onsave(inputName)" title="Close">
                <v-icon class="fas fa-save" style="margin-left:auto;margin-right:auto;"/>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-list two-line>
        <v-list-tile v-for="(session, name) in sessions" v-bind:key="name">
          <v-list-tile-action>
            <v-btn dark fab small color="red" @click="ondelete(name)" title="Delete Session">
              <v-icon class="fas fa-trash"/>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn dark fab small color="orange" @click="onsave(name)" title="Save Session">
              <v-icon class="fas fa-save"/>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn dark fab small color="green" @click="onload(name)" title="Load Session">
              <v-icon class="fas fa-folder-open"/>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  State,
  SaveSession,
  DeleteSession,
  LoadSession,
  Sessions
} from "../models/Session";
import Vue from 'vue'
export default {
  props: ["display"],
  components: {},
  methods: {
    onclose() {
      State.ActiveSession.ShowSaveLoadDialog = false;
    },
    onsave(key) {
      if (typeof key === "undefined" || key === null || key.trim() === "") {
        alert("Please fill in a session name");
        return;
      }
      if (key in Sessions) {
        if (
          !confirm('Are you sure you wish to overwrite session "' + key + '"')
        ) {
          return;
        }
      }
      SaveSession(key, State.ActiveSession);
      State.ActiveSession.ShowSaveLoadDialog = false;
    },
    ondelete(key) {
      if (typeof key === "undefined" || key === null || key.trim() === "") {
        alert("Please fill in a session name");
        return;
      }
      if (!confirm('Are you sure you wish to delete session "' + key + '"')) {
        return;
      }
      DeleteSession(key);
      this.reopen();
    },
    onload(key) {
      if (typeof key === "undefined" || key === "" || key === null) {
        return;
      }
      if (
        State.ActiveSession.Hubs.length > 0 &&
        !confirm('Are you sure you wish to load "' + key + '"')
      ) {
        return;
      }
      LoadSession(key);
      State.ActiveSession.ShowSaveLoadDialog = false;
    },
    reopen() {
      State.ActiveSession.ShowSaveLoadDialog = false;
      Vue.nextTick(() => {
        State.ActiveSession.ShowSaveLoadDialog = true;
      });
    }
  },
  data() {
    return {
      State: State,
      inputName: "",
      sessions: Sessions
    };
  }
};
</script>