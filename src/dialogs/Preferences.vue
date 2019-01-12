<template>
  <div>
    <!-- Hub Edit Dialog -->
    <v-dialog v-model="dialog" dark max-width="450px" class="dialog" :persistent="loading">
      <v-card>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="black lighten-1"
          @click="dialog = false"
          title="Close"
          style="margin-top:3em"
        >
          <v-icon class="fas fa-times-circle"/>
        </v-btn>
        <v-card-title class="headline">Intrigue App Preferences</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout>
              <v-flex xs6>
                <v-switch
                  v-model="dark"
                  :label="dark?'Dark Theme':'Light Theme'"
                  color="black"
                  hide-details
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { IsEmpty } from "../utils/Entity";
import { mapGetters } from "vuex";
import Vue from "vue";
export default {
  watch: {
    dialog(val) {
      if (val) {
        this.onOpen();
      } else {
        this.onClose();
      }
    },
    dark(val) {
      if (val) {
        this.$store.commit("preferences/setTheme", "dark");
      } else {
        this.$store.commit("preferences/setTheme", "light");
      }
    }
  },
  computed: {
    ...mapGetters({
      hasFiles: "google/hasFiles",
      isEmpty: "session/isEmpty",
      isDarkThemeEnabled: "preferences/isDarkThemeEnabled"
    })
  },
  components: {},
  props: [],
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      loading: false,
      dark: true
    };
  },
  methods: {
    open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    async onOpen() {
      this.loading = true;
      this.dark = this.isDarkThemeEnabled;
    },
    onClose() {
      this.resolve();
    }
  }
};
</script>
<style scoped>
.dialog {
  position: absolute;
  z-index: 1000;
}
@media screen and (min-width: 500px) {
}
</style>