<template>
  <div>
    <!-- Avatar Designer Dialog -->
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
        <Avatar class="avatar-preview" v-bind:avatar="modifiedAvatar"/>
        <Avatar
          v-for="name in filteredPartNames"
          :key="name"
          class="avatar-part-option"
          :clotheType="['clotheColor'].indexOf(name) !== -1?'CollarSweater':(['graphicType'].indexOf(name) !== -1?'GraphicShirt':null)"
          :clotheColor="name === 'graphicType'?'Black':Parts[name][3]"
          :facialHairType="name==='facialHairColor'?'BeardLight':null"
          :topType="['hatColor'].indexOf(name) !== -1?'Turban':('ShortHairTheCaesar')"
          :attrName="name"
          :attrValue="name === 'hatColor'?'Black':Parts[name][4]"
          :title="'Pick '+name.substr(0,1).toUpperCase()+name.substr(1)"
          @click="onAvatarPartTypeSelected(name)"
        />
      </v-card>
    </v-dialog>
    <!-- Avatar Picker used when picking out a part -->
    <v-dialog v-model="picker" dark max-width="850px" class="dialog">
      <v-card>
        <Avatar
          v-for="name in options"
          :key="name"
          class="avatar-part-option"
          :avatar="modifiedAvatar"
          :attrName="lastSelectedPartType"
          :attrValue="name"
          :title="'Pick '+name.substr(0,1).toUpperCase()+name.substr(1)"
          @click="onAvatarPartSelected(name)"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Avatar, PartNames, Parts } from "../models/Avatar";
import avatarComp from "../components/Avatar";
import { IsEmpty } from "../utils/Entity";
import Vue from "vue";
let props = [];
// All parts should be properties aswell
PartNames.forEach(name => {
  props.push(name);
});
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
    Avatar: avatarComp
  },
  props: props,
  data() {
    return {
      Parts: Parts,
      PartNames: PartNames,
      originalAvatar: new Avatar(),
      modifiedAvatar: new Avatar(),
      lastSelectedPartType: "",
      dialog: false,
      picker: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    open(avatar) {
      return new Promise((resolve, reject) => {
        this.originalAvatar.Copy(avatar);
        this.modifiedAvatar.Copy(this.originalAvatar);
        this.resolve = resolve;
        this.reject = reject;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    onAvatarPartTypeSelected(name) {
      this.lastSelectedPartType = name;
      Vue.nextTick(() => {
        this.picker = true;
      });
    },
    onAvatarPartSelected(value) {
      if (this.lastSelectedPartType === "") {
        return;
      }
      this.modifiedAvatar[this.lastSelectedPartType] = value;
      this.lastSelectedPartType = "";
      Vue.nextTick(() => {
        this.picker = false;
      });
    },
    onOpen() {
      //
    },
    onClose() {
      // Check for changes
      this.picker = false;
      var changes = {};
      PartNames.forEach(name => {
        if (this.originalAvatar[name] !== this.modifiedAvatar[name]) {
          changes[name] = this.modifiedAvatar[name];
        }
      });
      this.resolve(changes);
    }
  },
  computed: {
    filteredPartNames() {
      return PartNames.filter(name => {
        return ["avatarStyle"].indexOf(name) === -1;
      });
    },
    options() {
      if (this.lastSelectedPartType === null) {
        return [];
      }
      return Parts[this.lastSelectedPartType];
    },
    url() {
      return GenerateAvataaarURL(this.avatar, this.props);
    },
    props() {
      let obj = {};
      PartNames.forEach(name => {
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
div.avatar-preview {
  width: 100%;
  max-width: 400px;
  float: right;
}
div.avatar-part-option {
  width: 25%;
  display: inline-block;
}
.dialog {
    position: absolute;
    z-index: 1000;
}
@media screen and (min-width: 500px) {
  div.avatar-part-option {
    width: 16%;
  }
}
</style>