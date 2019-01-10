<template>
  <div>
    <!-- Hub Edit Dialog -->
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
          <v-container>
            <avatar class="avatar" v-bind:avatar="modifiedHub.avatar"/>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Hub } from "../models/Hub";
import Avatar from "../components/Avatar";
import { IsEmpty } from "../utils/Entity";
import Vue from "vue";
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
  components: {
    Avatar
  },
  props: [],
  data() {
    return {
      originalHub: new Hub(),
      modifiedHub: new Hub(),
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(hub) {
      return new Promise((resolve, reject) => {
        this.originalHub.Copy(hub);
        this.modifiedHub.Copy(this.originalHub);
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
      this.resolve(this.modifiedHub);
    }
  },
  computed: {
    title() {
      return this.modifiedHub.displayName;
    }
  }
};
</script>
<style scoped>
div.avatar {
  width: 100%;
  max-width: 400px;
  float: right;
}
.dialog {
  position: absolute;
  z-index: 1000;
}
@media screen and (min-width: 500px) {
}
</style>