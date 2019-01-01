<template>
  <div>
    <v-speed-dial
      v-model="hub.state.showSpeedDialMenu1"
      :top="false"
      :bottom="false"
      :right="false"
      :left="false"
      :direction="'top'"
      :open-on-hover="true"
      :transition="'slide-y-reverse-transition'"
    >
      <v-btn fab dark large color="indigo" v-bind:onmousedown="editButtonCMD">
        <v-icon class="fas fa-edit" title="Edit Hub"></v-icon>
      </v-btn>
      <v-btn fab dark large color="red" v-bind:onmousedown="expandButton2CMD">
        <v-icon class="fas fa-trash" title="Delete Hub"></v-icon>
      </v-btn>
    </v-speed-dial>

    <v-speed-dial
      v-model="hub.state.showSpeedDialMenu2"
      :top="false"
      :bottom="false"
      :right="false"
      :left="false"
      :direction="'top'"
      :open-on-hover="true"
      :transition="'slide-y-reverse-transition'"
    >
    </v-speed-dial>
    <v-speed-dial
      v-model="hub.state.showSpeedDialMenu3"
      :top="false"
      :bottom="false"
      :right="false"
      :left="false"
      :direction="'top'"
      :open-on-hover="true"
      :transition="'slide-y-reverse-transition'"
    >
    <v-btn fab dark large color="red" v-bind:onmousedown="closeButtonCMD">
        <v-icon class="fas fa-times" title="Abort"></v-icon>
      </v-btn>
      <v-btn fab dark large color="green" v-bind:onmousedown="deleteButtonCMD">
        <v-icon class="fas fa-check" title="Confirm Removal"></v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  props: ["hub"],
  components: {},
  methods: {},
  data() {
    return {
      moveButtonCMD:
        "State.ActiveSession.HubsByID['" + this.hub.id + "'].state.Move(event)",
      editButtonCMD:
        "State.ActiveSession.HubsByID['" + this.hub.id + "'].state.EditForm(event)",
      deleteButtonCMD:
        "State.ActiveSession.HubsByID['" + this.hub.id + "'].state.Remove(event)",
      closeButtonCMD:
        "State.ActiveSession.HubsByID['" +
        this.hub.id +
        "'].state.Reset(true,event)",
      expandButtonCMD:
        "State.ActiveSession.HubsByID['" +
        this.hub.id +
        "'].state.SpeedDialMenu2(event)",
      expandButton2CMD:
        "State.ActiveSession.HubsByID['" +
        this.hub.id +
        "'].state.SpeedDialMenu3(event)",
      connectHubButtonCMD:
        "State.ActiveSession.HubsByID['" + this.hub.id + "'].state.Connect()"
    };
  }
};
</script>