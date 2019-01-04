<template>
  <v-app>
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
          <v-list-tile @click="onSaveLoadClick">
            <v-list-tile-title>Save / Load</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onClearClick">
            <v-list-tile-title>Clear</v-list-tile-title>
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
export default {
  name: "app",
  data() {
    return {
      //
    };
  },
  methods: {
    onSaveLoadClick() {},
    onClearClick() {}
  }
};
</script>
