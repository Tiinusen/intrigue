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
        <v-card-title class="headline">Privacy Policy</v-card-title>
        <v-card-text>
          Intrigue App does not share any of your data with a third-party,
          Intrigue App does collect analytical information about how
          the app is used through Google Analytics, but the data itself
          is only button usages and visited views, Google Analytics
          collects this information in such a way it can't be linked to a real user.
          <br>
          <br>By giving Intrigue App access to your Google Drive it will
          be able to save and load Intrigue App Sessions and also
          to make the usage experience better providing you with the
          possibility to save preferences and auto sync sessions.
          <br>
          <br>In the future, maybe it will even be possible to share
          and share and divide sessions between DMs and Players
          <br>
          <br>
          The source code for this project is available at <a style="color: white;" target="_blank" href="https://github.com/Tiinusen/intrigue">github.com/Tiinusen/intrigue</a>,
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green" @click="onAccept">Accept</v-btn>
          <v-btn flat color="red" @click="onReject">Reject and Close</v-btn>
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
      reject: null,
      accepted: false
    };
  },
  methods: {
    onAccept() {
      this.accepted = true;
      this.dialog = false;
    },
    onReject() {
      this.accepted = false;
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
    async onOpen() {
      this.accepted = false;
    },
    onClose() {
      this.resolve(this.accepted);
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