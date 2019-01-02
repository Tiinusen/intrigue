<template>
  <v-dialog
    v-model="visible"
    dark
    persistent
    max-width="600px"
    style="position:relative;z-index:2000;"
  >
    <ColorPicker v-model="color" style="width:100%;overflow:hidden;height:300px;"/>
  </v-dialog>
</template>
<script>
import { Swatches as ColorPicker } from "vue-color";
import Vue from "vue";
export default {
  props: [],
  components: {
    ColorPicker
  },
  watch: {
    color(color) {
      this.onpick(color.hex);
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    onpick(color) {
      this.visible = false;
      if (this.callback !== null) {
        this.callback(color);
        this.callback = null;
      }
      this.$emit("pick", color);
    },
    pick(callback) {
      this.callback = callback;
      this.show();
    }
  },
  data() {
    return {
      visible: false,
      callback: null,
      color: "#000000"
    };
  }
};
</script>

<style scoped>
.v-form {
  padding: 20px;
}
</style>