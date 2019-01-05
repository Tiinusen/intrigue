<template>
  <div>
    <!-- Sub Type Dialog -->
    <v-dialog v-model="dialog" persistent dark max-width="600px" class="dialog">
      <v-card>
        <v-container
          class="sub-type-option"
          v-for="(option, key) in options"
          :key="key"
          @click="onOptionSelect(option)"
        >
          <v-flex>
            <img :src="'/icons/'+key.replace(/\./g,'/').replace(/ /g, '_')+'.png'"/>
            <div style="text-align:center">{{ option }}</div>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
  components: {},
  props: {},
  computed: {
    options() {
      if (this.type === null || this.subTypes === null) {
        return {};
      }
      let obj = {};
      Object.keys(this.subTypes).forEach(subType => {
        obj[this.type + "." + subType] = subType;
      });
      return obj;
    }
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      type: null,
      subTypes: null,
      reject: null
    };
  },
  methods: {
    open(type, subTypes) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.type = type;
        this.subTypes = subTypes;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    onOptionSelect(option) {
      let resolveRef = this.resolve;
      let rejectRef = this.reject;
      this.resolve = null;
      this.reject = null;
      Vue.nextTick(async () => {
        let selectedSubType = this.type + "." + option;
        let subOptions = this.subTypes[option];
        if (Object.keys(subOptions).length > 0) {
          selectedSubType = await this.open(selectedSubType, subOptions);
        }
        this.dialog = false;
        resolveRef(selectedSubType);
      });
    },
    onOpen() {
      //
    },
    onClose() {
      //
    }
  }
};
</script>
<style scoped>
img {
  width:100px;
  height:107px;
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