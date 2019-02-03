<template>
  <div>
    <!-- Sub Type Dialog -->
    <v-dialog v-model="dialog" dark max-width="400px" class="dialog">
      <v-card>
        <v-tabs grow dark>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab selected href="#tab-1">Archons</v-tab>
          <v-tab href="#tab-2">Death Angels</v-tab>
          <v-tab-item value="tab-1" :key="1">
            <v-card flat>
              <v-card-text>
                <v-list two-line>
                  <v-list-tile avatar v-for="(description, name) in archons" :key="name" @click="onArchonSelect(name)">
                    <v-list-tile-avatar>
                      <img :src="createArchonURL(name)">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ description }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2" :key="2">
            <v-card flat>
              <v-card-text>
                <v-list two-line>
                  <v-list-tile avatar v-for="(description, name) in deathAngels" :key="name" @click="onDeathAngelSelect(name)">
                    <v-list-tile-avatar>
                      <img :src="createDeathAngelURL(name)">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ description }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import influences from "./../models/predefined_influences";
export default {
  watch: {
    dialog(val) {
      if (val) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  },
  components: {},
  props: {},
  computed: {
    archons() {
      return influences["Archons"];
    },
    deathAngels() {
      return influences["Death Angels"];
    }
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    createArchonURL(name) {
      return "/influences/archons/" + name.toLowerCase().replace(/ /g, "_") + ".png";
    },
    createDeathAngelURL(name) {
      return "/influences/death_angels/" + name.toLowerCase().replace(/ /g, "_") + ".png";
    },
    open() {
      return new Promise((resolve, reject) => {
        this.dialog = true;
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    onNoneSelect() {
      Vue.nextTick(async () => {
        this.resolve(null);
        this.reject = null;
        this.resolve = null;
        this.dialog = false;
      });
    },
    onArchonSelect(option) {
      Vue.nextTick(async () => {
        this.dialog = false;
        if (!(option in influences["Archons"])) {
          this.reject("Option is not a valid Archon");
          this.reject = null;
          this.resolve = null;
          return;
        }
        this.resolve("Archons." + option);
        this.reject = null;
        this.resolve = null;
      });
    },
    onDeathAngelSelect(option) {
      Vue.nextTick(async () => {
        this.dialog = false;
        if (!(option in influences["Death Angels"])) {
          this.reject("Option is not a valid Death Angel");
          this.reject = null;
          this.resolve = null;
          return;
        }
        this.resolve("Death Angels." + option);
        this.reject = null;
        this.resolve = null;
      });
    },
    onOpen() {
      //
    },
    onClose() {
      if (this.resolve !== null) {
        this.resolve();
      }
    }
  }
};
</script>
<style scoped>
.dialog {
  position: absolute;
  z-index: 1500;
}
@media screen and (max-width: 500px) {
  div.sub-type-option {
    width: 45%;
  }
}
</style>