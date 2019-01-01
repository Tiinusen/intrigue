<template>
  <v-dialog
    v-model="State.ActiveSession.ShowConnectDialog"
    dark
    persistent
    max-width="600px"
    style="position:relative;z-index:2000;"
  >
    <br>
    <v-card>
      <v-btn
        dark
        fab
        absolute
        top
        right
        color="red"
        @click="onclose"
        style="margin-right:6em"
        title="Close dialog without creating link"
      >
        <v-icon class="fas fa-trash" style="margin-left:auto;margin-right:auto;"/>
      </v-btn>
      <v-btn
        dark
        fab
        absolute
        top
        right
        color="blue"
        @click="oncreate"
        title="Create link and close dialog"
      >
        <v-icon class="fas fa-plug" style="margin-left:auto;margin-right:auto;"/>
      </v-btn>
      <v-card-title class="headline grey darken-2" primary-title>
        {{ aFullName }}
        <v-icon class="fas fa-angle-double-left" style="margin-left:auto;margin-right:auto;"/>Create Link
        <v-icon class="fas fa-angle-double-right" style="margin-left:auto;margin-right:auto;"/>
        {{ bFullName }}
      </v-card-title>
      <v-form @submit.prevent>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12>
              <v-switch label="Use Preset" v-model="link.IsPreset" @change="omIsPresetChange"></v-switch>
              <v-radio-group v-model="link.Importance" row>
                <v-radio label="Notice" :value="1"></v-radio>
                <v-radio label="Normal" :value="2"></v-radio>
                <v-radio label="Main" :value="3"></v-radio>
              </v-radio-group>
              <v-radio-group
                v-model="link.Preset"
                v-if="link.IsPreset"
                @change="onPresetChange"
                row
              >
                <v-radio label="Relation" value="relation"></v-radio>
                <v-radio label="Murder" value="murder"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-btn
                dark
                fab
                @click="onswap"
                style="margin-right:10px;margin-top:10px;"
                title="Swaps"
              >
                <v-icon class="fas fa-exchange-alt" style="margin-left:auto;margin-right:auto;"/>
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                xs2
                v-model="link.AtoB"
                v-bind:disabled="link.IsPreset"
                v-bind:label="AtoBLabel"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                xs2
                v-model="link.BtoA"
                v-bind:disabled="link.IsPreset"
                v-bind:label="BtoALabel"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { State } from "../models/Session";
import { Link } from "../models/Link";
import Vue from "vue";
export default {
  props: ["hub"],
  components: {},
  computed: {
    AtoBLabel() {
      return this.aFullName + " relation to " + this.bFullName;
    },
    BtoALabel() {
      return this.bFullName + " relation to " + this.aFullName;
    },
    aFullName() {
      return State.ActiveSession.HubSelectedForConnectA !== null
        ? State.ActiveSession.HubSelectedForConnectA.name
        : "";
    },
    bFullName() {
      return State.ActiveSession.HubSelectedForConnectB !== null
        ? State.ActiveSession.HubSelectedForConnectB.name
        : "";
    }
  },
  methods: {
    onswap() {
      let temp = this.link.BtoA;
      this.link.BtoA = this.link.AtoB;
      this.link.AtoB = temp;
    },
    omIsPresetChange() {
      if (this.link.IsPreset) {
        this.onPresetChange();
      } else {
        this.link.AtoB = "";
        this.link.BtoA = "";
      }
    },
    onPresetChange() {
      switch (this.link.Preset) {
        case "relation":
          this.link.AtoB = "Acquaintance";
          this.link.BtoA = "Acquaintance";
          break;
        case "murder":
          this.link.AtoB = "Killed";
          this.link.BtoA = "Killed By";
          break;
      }
    },
    onclose() {
      State.ActiveSession.ShowConnectDialog = false;
      State.ActiveSession.LastActiveState = null;
      State.ActiveSession.HubSelectedForConnectA = null;
      State.ActiveSession.HubSelectedForConnectB = null;
      this.link = new Link(false);
    },
    oncreate() {
      this.link.HubA = State.ActiveSession.HubSelectedForConnectA;
      this.link.HubB = State.ActiveSession.HubSelectedForConnectB;
      new Link(this.link);
      Vue.nextTick(() => {
        this.onclose();
        this.link = new Link(false);
      });
    }
  },
  data() {
    return {
      State: State,
      link: new Link(false)
    };
  }
};
</script>

<style scoped>
.v-form {
  padding: 20px;
}
</style>