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
            <v-layout>
              
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
    }
  },
  computed: {
    title() {
      return "Dunno yet";
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