<template>
  <v-dialog
    v-if="typeof hub.state !== 'undefined'"
    v-model="hub.state.showEditForm"
    dark
    max-width="600px"
    style="position:relative;z-index:1000;"
  >
    <br>
    <v-card>
      <v-btn
        dark
        fab
        absolute
        top
        right
        color="blue"
        @click="onclose"
        title="Close dialog without creating link"
      >
        <v-icon class="fas fa-save" style="margin-left:auto;margin-right:auto;"/>
      </v-btn>
      <v-card-title class="headline grey darken-2" primary-title>{{ hub.name }}</v-card-title>
      <v-form @submit.prevent>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs9>
              <v-radio-group v-model="hub.characterType" v-if="hub.type == 'character'" row>
                <v-radio label="NPC" value="npc"></v-radio>
                <v-radio label="PC" value="pc"></v-radio>
                <v-radio label="Monster" value="monster"></v-radio>
                <v-radio label="Threat" value="threat"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs3>
              <AvatarDesigner v-bind:avatar="hub.avatar" v-if="hub.type == 'character'"></AvatarDesigner>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                xs2
                v-model="hub.identities[0].firstName"
                v-if="hub.identities[0].name == '' && hub.type == 'character'"
                label="Firstname"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                xs2
                v-model="hub.identities[0].lastName"
                v-if="hub.identities[0].name == '' && hub.type == 'character'"
                label="Lastname"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field
            xs2
            v-model="hub.identities[0].name"
            label="Name"
            v-if="(hub.identities[0].firstName == '' && hub.identities[0].lastName == '') || hub.type !== 'character'"
            required
          ></v-text-field>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import AvatarDesigner from "./AvatarDesigner";
import { State } from "../models/Session";
import Vue from "vue";
export default {
  props: ["hub"],
  methods: {
    onclose() {
      this.hub.state.showEditForm = false;
      State.ActiveSession.ShowConnectDialog = false;
      let connectWithA = null;
      if (State.ActiveSession.HubSelectedForConnectA !== null && State.ActiveSession.HubSelectedForConnectA !== this.hub) {
        connectWithA = State.ActiveSession.HubSelectedForConnectA;
        connectWithA.state.Reset(); 
      }
      if (State.ActiveSession.LastActiveState !== null) {
        State.ActiveSession.LastActiveState.Reset();
      }
      Vue.nextTick(() => {
        if (connectWithA !== null) {
          State.ActiveSession.HubSelectedForConnectA = connectWithA;
          State.ActiveSession.HubSelectedForConnectB = this.hub;
          State.ActiveSession.ShowConnectDialog = true;
        }
      });
    }
  },
  components: {
    AvatarDesigner
  }
};
</script>

<style scoped>
.v-form {
  padding: 20px;
}
</style>