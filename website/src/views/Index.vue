<template>
  <v-dialog
    v-model="showDialog"
    dark
    persistent
    max-width="600px"
    style="position:relative;z-index:2000;"
  >
    <v-card>
      <v-card-title class="headline grey darken-2" primary-title>
        <v-icon class="fas fa-map-marked-alt" style="margin-right:0.5em;"/>Intrigue Map by Tiinusen
      </v-card-title>
      <v-card-text>
        <h2>Welcome to the newly developed Intrigue Map</h2>
        <div>
          This web application is intended to be used as a tool
          for game masters of
          <br>Kult Divinity Lost&trade;
        </div>
        <br>
        <div>The application is in an early stage and should not be used
          <br>for other purposes than trying it out, Feedback can be given at
          the Github page
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn flat color="green" @click="onClickGoToMap">Continue to intrigue map</v-btn>
        <v-btn flat color="red" @click="onClickWhatIsKult">Learn more about Kult Divinity Lost</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showDialog: true
    };
  },
  methods: {
    onClickGoToMap() {
      this.showDialog = false;
      window.location.hash = "/map";
    },
    onClickWhatIsKult() {
      this.showDialog = false;
      window.location.hash = "/what/about/kult";
    }
  },
  mounted() {
    this.showDialog = true;
  }
};
</script>
<style>
h1 {
  margin-left: 10px;
  margin-top: 10px;
}
.v-card {
  margin: 20px;
}
</style>
