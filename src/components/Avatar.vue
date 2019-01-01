<template>
  <div>
    <v-img v-bind:src="displayAvatar.url" aspect-ratio="1"></v-img>
  </div>
</template>

<script>
import { Avatar } from "../models/Avatar";
export default {
  props: [
    "avatar",
    "avatarStyle",
    "skin",
    "topType",
    "accessories",
    "facial",
    "facialColor",
    "hair",
    "clothes",
    "eye",
    "eyebrow",
    "mouth"
  ],
  methods:{
    GetDisplayAvatar(){
      var parts = [
        "avatarStyle",
        "skin",
        "topType",
        "accessories",
        "facial",
        "facialColor",
        "hair",
        "clothes",
        "eye",
        "eyebrow",
        "mouth"
      ];
      this._avatar = new Avatar();
      if (this.avatar !== null && typeof this.avatar !== "undefined") {
        this._avatar.CopyFrom(this.avatar);
      }
      parts.forEach(partName => {
        if (typeof this[partName] !== "undefined") {
          this._avatar[partName] = this[partName];
        }
      });
      return this._avatar;
    }
  },
  computed: {
    displayAvatar() {
      return this.GetDisplayAvatar();
    }
  }
};
</script>