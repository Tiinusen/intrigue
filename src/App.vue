<template>
  <v-app>
    <vue-headful title="Intrigue Map" description="Intrigue Map is a tool dedicated to game masters of Kult Divinity Lost"/>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Intrigue</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import vueHeadful from 'vue-headful';
export default {
  name: "IntrigueMap",
  data: function() {
    return {};
  },
  components:{
    vueHeadful
  }
};
</script>
