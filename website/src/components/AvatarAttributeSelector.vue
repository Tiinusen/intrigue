<template>
  <div>
    <Avatar
      @click.native="onClickOpenSelector"
      v-bind:avatar="displayAvatar"
      avatarStyle="Transparent"
    ></Avatar>
    <v-dialog
      v-model="openDialog"
      dark
      persistent
      max-width="45%"
      style="position:relative;z-index:1000;"
    >
      <v-card>
        <v-container>
          <v-layout text-xs-center wrap>
            <v-flex xs2 v-bind:key="av.id" v-for="av in avatars">
              <Avatar
                v-bind:title="av[name]"
                @click.native="onClickSelect(av)"
                v-bind:avatar="av"
                avatarStyle="Transparent"
              ></Avatar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
import Avatar from "./Avatar";
import { Avatar as AvatarModel } from "../models/Avatar";
export default {
  props: [
    "avatar",
    "name",
    "options",
    "default",
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
  components: {
    Avatar
  },
  methods: {
    onClickOpenSelector() {
      this.openDialog = true;
    },
    onClickSelect(av) {
      this.avatar[this.name] = av[this.name];
      this.openDialog = false;
    }
  },
  computed: {
    displayAvatar() {
      return this._avatar;
    }
  },
  data() {
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
    this._avatar = new AvatarModel();
    parts.forEach(partName => {
      if (typeof this[partName] !== "undefined") {
        this._avatar[partName] = this[partName];
      }
    });
    this._avatar[this.name] = this.default;
    if (typeof this._avatars === "undefined") {
      this._avatars = [];
      if (typeof this.options !== "undefined") {
        this.options.forEach(option => {
          let avatar = new AvatarModel();
          avatar.CopyFrom(this._avatar);
          avatar[this.name] = option;
          this._avatars.push(avatar);
        });
      }
    }
    return {
      openDialog: false,
      avatars: this._avatars
    };
  }
};
</script>