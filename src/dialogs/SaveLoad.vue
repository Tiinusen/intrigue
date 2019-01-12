<template>
  <div>
    <!-- Hub Edit Dialog -->
    <v-dialog v-model="dialog" dark max-width="850px" class="dialog" :persistent="loading">
      <v-card>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="black lighten-1"
          @click="dialog = false"
          v-show="!loading"
          title="Close"
          style="margin-top:3em"
        >
          <v-icon class="fas fa-times-circle"/>
        </v-btn>
        <v-card-title class="headline">Save / Load</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-text-field
                  :disabled="loading || isEmpty"
                  v-model="sessionName"
                  label="Session name"
                ></v-text-field>
                <v-progress-linear
                  v-show="selectedFileId === null && loading"
                  :indeterminate="true"
                  color="white"
                />
              </v-flex>
              <v-btn
                v-show="!loading && !isEmpty"
                icon
                ripple
                @click="onSaveAs"
                style="padding-right:2em;"
              >
                <v-icon color="white">Save as ..</v-icon>
              </v-btn>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-list>
                  <v-list-tile v-for="file in $store.state.google.files" :key="file.id">
                    <v-list-tile-content>
                      <v-list-tile-title v-show="selectedFileId !== file.id">{{ file.name }}</v-list-tile-title>
                      <v-progress-linear
                        color="white"
                        v-show="selectedFileId === file.id && loading"
                        :indeterminate="true"
                      />
                    </v-list-tile-content>
                    <v-list-tile-action v-show="!loading" class="hidden-md-and-down">
                      <v-btn flat button @click="onDelete(file.id)">
                        <v-icon color="white">Delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-show="!loading" class="hidden-md-and-down">
                      <v-btn flat button :disabled="isEmpty" @click="onSave(file.id)">
                        <v-icon color="white">Save</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-show="!loading" class="hidden-md-and-down">
                      <v-btn flat button @click="onLoad(file.id)">
                        <v-icon color="white">Load</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-show="!loading" class="hidden-lg-and-up">
                      <v-btn icon button @click="onDelete(file.id)">
                        <v-icon color="white">D</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-show="!loading" class="hidden-lg-and-up">
                      <v-btn icon button :disabled="isEmpty" @click="onSave(file.id)">
                        <v-icon color="white">S</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action v-show="!loading" class="hidden-lg-and-up">
                      <v-btn icon button @click="onLoad(file.id)">
                        <v-icon color="white">L</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { IsEmpty } from "../utils/Entity";
import { mapGetters } from "vuex";

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
      sessionName: "",
      selectedFileId: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      hasFiles: "google/hasFiles",
      isEmpty: "session/isEmpty"
    })
  },
  methods: {
    async onSaveAs() {
      let fileId = null;
      let sessionName = this.sessionName;
      if (sessionName.trim() === "") {
        return;
      }
      this.$store.state.google.files.forEach(file => {
        if (file.name === sessionName) {
          fileId = file.id;
        }
      });
      this.loading = true;
      this.selectedFileId = fileId;
      await this.$store.dispatch("google/save", { fileId, sessionName });
      await this.$store.dispatch("google/loadFileListIntoState");
      this.loading = false;
      this.selectedFileId = null;
      this.sessionName = "";
      this.dialog = false;
    },
    async onDelete(fileId) {
      if (!confirm("Are you sure you wish to delete this session file?")) {
        return;
      }
      this.loading = true;
      this.selectedFileId = fileId;
      await this.$store.dispatch("google/delete", { fileId });
      await this.$store.dispatch("google/loadFileListIntoState");
      this.loading = false;
      this.selectedFileId = null;
      if (this.isEmpty && !this.hasFiles) {
        this.dialog = false;
      }
    },
    async onSave(fileId) {
      if (!confirm("Are you sure you wish to overwrite this session file?")) {
        return;
      }
      this.loading = true;
      this.selectedFileId = fileId;
      await this.$store.dispatch("google/save", { fileId });
      await this.$store.dispatch("google/loadFileListIntoState");
      this.loading = false;
      this.selectedFileId = null;
      this.dialog = false;
    },
    async onLoad(fileId) {
      if (!this.isEmpty && !confirm("Are you sure?")) {
        return;
      }
      this.loading = true;
      this.selectedFileId = fileId;
      await this.$store.dispatch("google/load", { fileId });
      await this.$store.dispatch("google/loadFileListIntoState");
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
      this.selectedFileId = null;
      this.loading = false;
      await this.$store.dispatch("google/loadFileListIntoState");
    },
    onClose() {
      this.resolve();
    }
  }
};
</script>
<style scoped>
.dialog {
  position: absolute;
  z-index: 1000;
}
.v-list__tile__action {
  margin-left: 1em;
}
@media screen and (max-width: 500px) {
  .v-list__tile__action {
    margin-left: 0.1em !important;
  }
}
</style>