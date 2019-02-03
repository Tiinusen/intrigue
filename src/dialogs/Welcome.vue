<template>
  <div>
    <!-- Hub Edit Dialog -->
    <v-dialog v-model="dialog" dark max-width="550px" class="dialog">
      <v-card>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="black lighten-1"
          @click="dialog = false"
          title="Close"
          style="margin-top:3em"
        >
          <v-icon class="fas fa-times-circle"/>
        </v-btn>
        <v-card-title class="headline">Welcome</v-card-title>
        <v-card-text>
          Hi, Lookslike you are new to Intrigue Map
          <br/><br/>
          This roleplaying tool aims to assist the Dungeon Master with her
          storytelling and was developed foremost for <a style="color: white;" target="_blank" href="https://kultdivinitylost.com/">Kult: Divinity Lost</a>&trade;
          <br/><br/>
          It's recommended for beginners to take a look at the Example Kult Map which is by the book
          and feel free to advice the help dialog which you can find in the menu top right of the screen
          <br/><br/>
          This welcome dialog will stop popping up once you sign in to Google Drive
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="onBlank">Blank Map</v-btn>
          <v-btn flat color="green" @click="onExample">Example Kult Map</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
  props: [],
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null
    };
  },
  methods: {
    onAccept() {
      this.dialog = false;
    },
    onReject() {
      this.dialog = false;
    },
    open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        Vue.nextTick(() => {
          this.dialog = true;
        });
      });
    },
    onBlank(){
      this.dialog = false;
      this.$emit('click:blank')
    },
    onExample(){
      this.dialog = false;
      this.$emit('click:example')
    },
    async onOpen() {
      
    },
    onClose() {
      this.resolve();
    }
  },
  computed: {}
};
</script>
<style scoped>
.dialog {
  position: absolute;
  z-index: 1000;
}
@media screen and (min-width: 500px) {
}
</style>