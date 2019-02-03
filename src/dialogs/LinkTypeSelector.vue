<template>
  <div>
    <!-- Sub Type Dialog -->
    <v-dialog v-model="dialog" persistent dark max-width="600px" class="dialog">
      <v-card>
        <v-btn
          large
          v-for="(option, key) in options"
          :key="key"
          @click="onOptionSelect(option)"
        >{{ option }}</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { IsEmpty } from "../utils/Entity";
import { Link, LinkTypes } from "../models/Link";
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
  components: {},
  props: {},
  computed: {
    options() {
      if (this.link === null) {
        return [];
      }
      return this.link.validLinkTypeNames;
    }
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      link: new Link(),
      reject: null
    };
  },
  methods: {
    open(link) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.link.hubA = link.hubA;
        this.link.hubB = link.hubB;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    onOptionSelect(option) {
      Vue.nextTick(async () => {
        this.dialog = false;
        if (!(option in LinkTypes)) {
          this.reject("Option is not a valid linktype");
          this.reject = null;
          this.resolve = null;
          return;
        }
        this.resolve(LinkTypes[option]);
        this.reject = null;
        this.resolve = null;
      });
    },
    onOpen() {
      //
    },
    onClose() {
      if (this.resolve !== null) {
        this.resolve(null);
      }
    }
  }
};
</script>
<style scoped>
img {
  width: 100px;
  height: 107px;
}
div.sub-type-option {
  width: 150px;
  display: inline-block;
}
.dialog {
  position: absolute;
  z-index: 1000;
}
@media screen and (max-width: 500px) {
  div.sub-type-option {
    width: 45%;
  }
}
</style>