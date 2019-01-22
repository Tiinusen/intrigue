<template>
  <div>
    <!-- Link Edit Dialog -->
    <v-dialog v-model="dialog" dark max-width="850px" class="dialog">
      <v-card>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="blue"
          @click="dialog = false"
          title="Close"
          style="margin-top:3em"
        >
          <v-icon class="fas fa-times-circle"/>
        </v-btn>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex shrink>
                <swatches v-model="modifiedLink.color" colors="text-basic" popover-to="right"/>
              </v-flex>
              <v-flex>
                <v-select
                  v-model="modifiedLink.linkThickness"
                  :items="[{text: 'Small', value:1},{text: 'Medium', value:2},{text: 'Large', value:3},{text: 'Big', value:5}]"
                  outline
                  style="font-size:1em;"
                  label="Line thickness"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2 pb-4 hidden-sm-and-down>
                <img
                  v-if="modifiedLink.hubA !== null"
                  :src="modifiedLink.hubA.url"
                  class="hub-icon"
                >
              </v-flex>
              <v-flex>
                <v-container fluid>
                  <v-layout column>
                    <v-flex>
                      <v-container fluid>
                        <v-layout row>
                          <v-flex shrink mr-3>
                            <i class="fas fa-angle-double-right"/>
                          </v-flex>
                          <v-flex expand>
                            <v-text-field
                              v-model="modifiedLink.AtoB"
                              :label="labelA"
                              placeholder="killed (example)"
                              :title="'if relationship is form of an action initiated by first hub\nthen this word or sentence should be something like \'killed\', or if it\'s like a relationship then this could be \'son\' or \'father\''"
                            />
                          </v-flex>
                          <v-flex shrink ml-3>
                            <i class="fas fa-angle-double-right"/>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex>
                      <v-container fluid>
                        <v-layout row>
                          <v-flex shrink mr-3>
                            <i class="fas fa-angle-double-left"/>
                          </v-flex>
                          <v-flex expand>
                            <v-text-field
                              v-model="modifiedLink.BtoA"
                              :label="labelB"
                              placeholder="was killed by (example)"
                              :title="'if relationship is form of an action initiated by first hub\nthen this word or sentence should be something like \'was killed by\', or if it\'s like a relationship then this could be \'son\' or \'father\''"
                            />
                          </v-flex>
                          <v-flex shrink ml-3>
                            <i class="fas fa-angle-double-left"/>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex xs2 pb-4 hidden-sm-and-down>
                <img
                  v-if="modifiedLink.hubB !== null"
                  :src="modifiedLink.hubB.url"
                  class="hub-icon"
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Link } from "../models/Link";
import Avatar from "../components/Avatar";
import { IsEmpty } from "../utils/Entity";
import Vue from "vue";
import Swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";
export default {
  components: { Swatches },
  watch: {
    dialog(val) {
      if (val) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  },
  computed: {
    title() {
      return "Modify Link";
    },
    labelA() {
      if (this.modifiedLink.hubA === null || this.modifiedLink.hubB === null) {
        return "";
      }
      return (
        this.modifiedLink.hubA.displayName +
        " relationship with " +
        this.modifiedLink.hubB.displayName
      );
    },
    labelB() {
      if (this.modifiedLink.hubA === null || this.modifiedLink.hubB === null) {
        return "";
      }
      return (
        this.modifiedLink.hubB.displayName +
        " relationship with " +
        this.modifiedLink.hubA.displayName
      );
    }
  },

  props: [],
  data() {
    return {
      originalLink: new Link(),
      modifiedLink: new Link(),
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(link) {
      return new Promise((resolve, reject) => {
        this.originalLink.Copy(link);
        this.modifiedLink.Copy(this.originalLink);
        this.resolve = resolve;
        this.reject = reject;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    onOpen() {
      //
    },
    onClose() {
      this.resolve(this.modifiedLink);
      this.resolve = null;
      this.reject = null;
    }
  }
};
</script>
<style>
.vue-swatches__trigger {
  height: 60px !important;
  width: 60px !important;
}
</style>
<style scoped>
.fa-angle-double-right {
  font-size: 3em;
}

.fa-angle-double-left {
  font-size: 3em;
}
.dialog {
  position: absolute;
  z-index: 1000;
}
.hub-icon {
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 500px) {
}
</style>