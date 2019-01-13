<template>
  <v-img v-bind:src="url" aspect-ratio="1" @click="onClick" contain></v-img>
</template>

<script>
import { Avatar, PartNames, GenerateAvataaarURL } from "../models/Avatar";
import { IsEmpty } from "../utils/Entity";
let props = [
  "avatar", // Avatar model
  "editable", // If the avatar should be editable
  "attrName", // For dynamically setting an attribute
  "attrValue" // For dynamically assigning a value to setted attrName
];
// All parts should be properties aswell
PartNames.forEach(name => {
  props.push(name);
});
export default {
  components: {},
  props: props,
  data() {
    return {};
  },
  methods: {
    async onClick() {
      if (typeof this.editable === "undefined") {
        this.$emit("click"); // Emits activated event (since avatar is not editable)
        return;
      } else {
        let changes = await this.$root.AvatarDesigner.open(this.avatar);
        for (name in changes) {
          let value = changes[name];
          this.avatar[name] = value;
        }
      }
    }
  },
  computed: {
    url() {
      return GenerateAvataaarURL(this.avatar, this.props);
    },
    props() {
      let obj = {};
      PartNames.forEach(name => {
        if (
          typeof this.attrName === "string" &&
          this.attrName.trim().length > 0 &&
          this.attrName === name
        ) {
          obj[name] = this.attrValue;
          return;
        }
        if (IsEmpty(this[name])) {
          return;
        }
        obj[name] = this[name];
      });
      return obj;
    }
  }
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
