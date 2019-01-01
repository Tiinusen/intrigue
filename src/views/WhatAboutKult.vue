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
        <h2>What about Kult:Divinity Lost&trade;?</h2>
        <div>It's a Roleplaying Game which was crowdfounded on kickstarter,
          <br>Kult implements powered by the apocalypse and uses
          <br>the idea of an intrigue map to tell and develop the stories
          <br>
          <br>This tool was created to help do precisly that
          <br>
          <br>This tool however is not related to the author, company or their community
          <br>It's independently maintained by me, so please feel free to donate
          <br>if you feel that this tool is useful for telling your stories.
          <br>
          <br>Make a donation which takes this tool to the next step
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn flat color="green" @click="onClickGoToMap">Continue to intrigue map</v-btn>
        <v-btn flat color="red" @click="onClickDonate"><v-icon class="fas fa-hand-holding-usd"/>&nbsp;Donate through paypal</v-btn>
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
      window.location.hash = "/map";
    },
    onClickDonate() {
      window.location.href = "https://paypal.me/pools/c/8aYKUhWlPM";
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
