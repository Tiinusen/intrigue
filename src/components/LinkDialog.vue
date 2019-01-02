<template>
  <div>
    <ColorPickerDialog ref="colorpicker"/>
    <SelectPresetDialog ref="presetSelector" :presets="presets" :visible="visible" @pick="onpick"/>
    <v-dialog
      v-model="visible"
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
          <v-layout row wrap>
            <v-flex xs6>{{ aFullName }}</v-flex>
            <v-flex style="text-align:right" xs6>{{ bFullName }}</v-flex>
          </v-layout>
        </v-card-title>
        <v-form @submit.prevent>
          <v-container>
            <v-layout row wrap align-center justify-center>
              <v-flex d-inline-flex>
                <v-btn large :color="color" dark @click="onClickSelectColor">Color</v-btn>
              </v-flex>
              <v-flex d-inline-flex>
                <v-select :items="lineThicknesses" v-model="lineThickness" label="Thickness"></v-select>
              </v-flex>
              <v-flex d-inline-flex>
                <v-select :items="presets" v-model="preset" label="Preset" @change="onPresetChange"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs2>
                <v-btn dark fab @click="onswap" title="Swaps" v-if="showSwap">
                  <v-icon class="fas fa-exchange-alt"/>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container>
            <v-layout row wrap align-center justify-center>
              <v-flex xs6 style="min-width:240px">
                <v-text-field
                  xs2
                  v-model="link.AtoB"
                  v-bind:disabled="preset !== 'Input'"
                  v-bind:label="AtoBLabel"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6 style="min-width:240px">
                <v-text-field
                  xs2
                  v-model="link.BtoA"
                  v-bind:disabled="preset !== 'Input'"
                  v-bind:label="BtoALabel"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { State } from "../models/Session";
import { Link } from "../models/Link";
import SelectPresetDialog from "./SelectPresetDialog";
import ColorPickerDialog from "./ColorPickerDialog";
import Vue from "vue";
function PickHubByTypeAsConnectA(t) {
  if (
    State.ActiveSession.HubSelectedForConnectA === null ||
    State.ActiveSession.HubSelectedForConnectB === null
  ) {
    return false;
  }
  if (State.ActiveSession.HubSelectedForConnectA.type === t) {
    return true;
  } else if (State.ActiveSession.HubSelectedForConnectB.type === t) {
    var temp = State.ActiveSession.HubSelectedForConnectA;
    State.ActiveSession.HubSelectedForConnectA =
      State.ActiveSession.HubSelectedForConnectB;
    State.ActiveSession.HubSelectedForConnectB = temp;
    return true;
  } else {
    return false;
  }
}
export default {
  props: [],
  components: {
    SelectPresetDialog,
    ColorPickerDialog
  },
  computed: {
    showSwap() {
      if (
        State.ActiveSession.HubSelectedForConnectA === null ||
        State.ActiveSession.HubSelectedForConnectB === null
      ) {
        return false;
      }
      if (
        State.ActiveSession.HubSelectedForConnectA.type ==
          State.ActiveSession.HubSelectedForConnectB.type ||
        this.preset === "Input"
      ) {
        return true;
      }
      return false;
    },
    presets() {
      var list = ["Input"];
      for (let presetName in this.definedPresets) {
        let presetConfig = this.definedPresets[presetName];
        if (presetConfig[3].indexOf(this.type) !== -1) {
          list.push(presetName);
        }
      }
      return list;
    },
    visible() {
      if (this.lastState === State.ActiveSession.ShowConnectDialog) {
        return State.ActiveSession.ShowConnectDialog;
      }
      this.link.HubA = State.ActiveSession.HubSelectedForConnectA;
      this.link.HubB = State.ActiveSession.HubSelectedForConnectB;
      this.lastState = State.ActiveSession.ShowConnectDialog;
      if (State.ActiveSession.ShowConnectDialog) {
        this.oninit();
      }
      return State.ActiveSession.ShowConnectDialog;
    },
    type() {
      return this.link.Type;
    },
    AtoBLabel() {
      if (this.link.AtoB === "") {
        return this.aFullName + " relation to " + this.bFullName;
      }
      return this.aFullName + " " + this.link.AtoB + " " + this.bFullName;
    },
    BtoALabel() {
      if (this.link.BtoA === "") {
        return this.bFullName + " relation to " + this.aFullName;
      }
      return this.bFullName + " " + this.link.BtoA + " " + this.aFullName;
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
    onClickSelectColor() {
      this.$refs.colorpicker.pick(color => {
        this.color = color;
        this.link.Color = color;
      });
    },
    onpick(name, editAfterwards) {
      this.preset = name;
      this.onPresetChange();
      if (
        editAfterwards &&
        State.ActiveSession.HubSelectedForConnectA.type !==
          State.ActiveSession.HubSelectedForConnectB.type
      ) {
        this.oncreate();
      }
    },
    oninit() {
      this.link.HubA = State.ActiveSession.HubSelectedForConnectA;
      this.link.HubB = State.ActiveSession.HubSelectedForConnectB;
      this.lineThickness = "Thin";
      this.preset = "Input";
      if (this.link.HubA !== null && this.link.HubB !== null) {
        setTimeout(() => {
          this.$refs.presetSelector.showDialog();
        }, 100);
      }
    },
    onswap() {
      let temp = this.link.BtoA;
      this.link.BtoA = this.link.AtoB;
      this.link.AtoB = temp;
    },
    onPresetChange(event) {
      if (!(this.preset in this.definedPresets)) {
        this.link.AtoB = "";
        this.link.BtoA = "";
        this.link.Color = "green";
        return;
      }
      let preset = this.definedPresets[this.preset];
      for (let i = 0; i < preset[2].length; i++) {
        let word = preset[2][i];
        if (PickHubByTypeAsConnectA(word)) {
          break;
        }
      }
      this.link.AtoB = preset[0];
      this.link.BtoA = preset[1];
      this.link.Color = preset[4];
      this.color = this.link.Color;
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
      switch (this.lineThickness) {
        case "Thin":
          this.link.LineThickness = 1;
          break;
        case "Medium":
          this.link.LineThickness = 2;
          break;
        case "Thick":
          this.link.LineThickness = 3;
          break;
      }
      this.link.Preset = this.preset;
      new Link(this.link);

      Vue.nextTick(() => {
        this.onclose();
        this.link = new Link(false);
      });
    }
  },
  data() {
    var link = new Link(false);
    return {
      State: State,
      link: link,
      lineThickness: "Thin",
      lineThicknesses: ["Thin", "Medium", "Thick"],
      lastState: false,
      preset: link.Preset,
      color: "#FF0000",
      definedPresets: {
        /*
        Available Combinations
        character_character
        character_event
        character_place
        character_group_organization
        event_event
        event_place
        event_group_organization
        place_place
        place_group_organization
        group_organization_group_organization
        */
        Acquaintance: [
          // Name of preset
          "acquaintance with", // HubA relation to HubB
          "acquaintance with", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character"], // For which link types this preset is valid for
          "green" // default color for line
        ],
        Friends: [
          // Name of preset
          "friends with", // HubA relation to HubB
          "friends with", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character"], // For which link types this preset is valid for
          "green" // default color for line
        ],
        Family: [
          // Name of preset
          "family with", // HubA relation to HubB
          "family with", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character"], // For which link types this preset is valid for
          "blue" // default color for line
        ],
        Murder: [
          // Name of preset
          "killed", // HubA relation to HubB
          "was killed by", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character"], // For which link types this preset is valid for
          "red"
        ],
        Employed: [
          // Name of preset
          "was employed by", // HubA relation to HubB
          "employed", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character", "character_group_organization"], // For which link types this preset is valid for
          "green"
        ],
        Member: [
          // Name of preset
          "member of", // HubA relation to HubB
          "employed", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_character", "character_group_organization"], // For which link types this preset is valid for
          "blue"
        ],
        Visited: [
          // Name of preset
          "visited", // HubA relation to HubB
          "visited by", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_place"], // For which link types this preset is valid for
          "green"
        ],
        Lives: [
          // Name of preset
          "lives in", // HubA relation to HubB
          "here lives", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_place"], // For which link types this preset is valid for
          "blue"
        ],
        Participated: [
          // Name of preset
          "pariticpated in", // HubA relation to HubB
          "was pariticpated by", // HubB relation to HubA
          ["character"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_event"], // For which link types this preset is valid for
          "green"
        ],
        Located: [
          // Name of preset
          "was located in", // HubA relation to HubB
          "was the location of", // HubB relation to HubA
          ["event", "group_organization", "place"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          [
            "event_place",
            "group_organization_group_organization",
            "place_group_organization"
          ], // For which link types this preset is valid for
          "blue"
        ],
        "Is located": [
          // Name of preset
          "is located in", // HubA relation to HubB
          "is the location of", // HubB relation to HubA
          ["event", "group_organization", "place"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["place_place"], // For which link types this preset is valid for
          "blue"
        ],
        "Took place": [
          // Name of preset
          "took place in", // HubA relation to HubB
          "was the location of", // HubB relation to HubA
          ["event"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["event_place"], // For which link types this preset is valid for
          "blue"
        ],
        Wanted: [
          // Name of preset
          "wanted by", // HubA relation to HubB
          "wanted", // HubB relation to HubA
          ["character", "group_organization"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          [
            "character_character",
            "character_group_organization",
            "group_organization_group_organization"
          ], // For which link types this preset is valid for
          "red"
        ],
        "Wanted for": [
          // Name of preset
          "wanted for", // HubA relation to HubB
          "suspect", // HubB relation to HubA
          ["character", "group_organization"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_event", "event_group_organization"], // For which link types this preset is valid for
          "red"
        ],
        "Victim of": [
          // Name of preset
          "victim of", // HubA relation to HubB
          "victim", // HubB relation to HubA
          ["character", "group_organization"], // Type(s) with priority on slot A (swaps A and B if B is of valid type but not A)
          ["character_event", "event_group_organization"], // For which link types this preset is valid for
          "red"
        ]
      }
    };
  }
};
</script>

<style scoped>
.v-form {
  padding: 20px;
}
</style>