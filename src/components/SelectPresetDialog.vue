<template>
  <v-dialog
    v-model="visible"
    dark
    persistent
    max-width="600px"
    style="position:relative;z-index:2000;"
  >
    <br>
    <v-card>
      <v-card-title class="headline grey darken-2" primary-title>Pick Preset</v-card-title>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-switch
              dark
              fab
              absolute
              top
              right
              label="Create on select"
              v-model="toggle"
              v-if="showToggle"
            />
            <v-card-title v-if="!showToggle" style="font-size:1.1em;" >Must be edited</v-card-title>
          </v-flex>
          <v-flex xs6>
            <v-btn
              large
              color="red"
              dark
              style="width:94%;"
              @click="onclick('Input', false)"
            >Custom</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn
        large
        color="primary"
        style="width:45%;"
        dark
        @click="onclick(name, toggle)"
        v-bind:key="n"
        v-if="name !== 'Input'"
        v-for="(name, n) in presets"
      >{{ name }}</v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { State } from "../models/Session";

export default {
  props: ["presets"],
  computed: {
    showToggle() {
      if (
        State.ActiveSession.HubSelectedForConnectA === null ||
        State.ActiveSession.HubSelectedForConnectB === null
      ) {
        return false;
      }
      if (
        State.ActiveSession.HubSelectedForConnectA.type ==
        State.ActiveSession.HubSelectedForConnectB.type
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    showDialog() {
      this.visible = true;
    },
    onclick(name, toggle) {
      this.visible = false;
      this.$emit("pick", name, toggle);
    }
  },
  data() {
    return {
      visible: false,
      toggle: true
    };
  }
};
</script>

<style scoped>
.v-form {
  padding: 20px;
}
</style>