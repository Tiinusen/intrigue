<template>
  <div>
    <v-dialog v-model="dialog" dark max-width="1000px" class="dialog">
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
        <v-card-title class="headline">Help</v-card-title>
        <v-card-text>
          <v-tabs centered dark icons-and-text>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab selected href="#tab-1">
              <i class="fas fa-mouse-pointer"></i> Interaction
            </v-tab>
            <v-tab href="#tab-2">
              <i class="fas fa-keyboard"></i> Shortcuts
            </v-tab>
            <v-tab href="#tab-3">
              <i class="fas fa-info-circle"></i> Guide
            </v-tab>
            <!-- Buttons -->
            <v-tab-item value="tab-1" :key="1">
              <v-card flat>
                <v-card-text>
                  <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                      <v-flex d-flex md6>
                        <v-list two-line>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img src="/cursor.png">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Map Cursor</v-list-tile-title>
                              <v-list-tile-sub-title>Indicates where map
                                <br class="hidden-md-and-up">was pressed
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>These options are displayed with
                                <br class="hidden-md-and-up">the map cursor
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-user" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Contact / PC / Monster / Leader</v-list-tile-title>
                              <v-list-tile-sub-title>Opens sub menu</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img
                                class="speed-dial-icon"
                                contain
                                src="/buttons/place.png"
                                style="width:50px;"
                              >
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Place / Location / Building</v-list-tile-title>
                              <v-list-tile-sub-title>Opens sub menu</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img
                                class="speed-dial-icon"
                                contain
                                src="/buttons/event.png"
                                style="width:50px;"
                              >
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Event / Dark Secret / Object</v-list-tile-title>
                              <v-list-tile-sub-title>Opens sub menu</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-users" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Group / Organization</v-list-tile-title>
                              <v-list-tile-sub-title>Opens sub menu</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Contact / PC / Monster / Leader</v-list-tile-title>
                              <v-list-tile-sub-title>These sub options belongs to
                                <br class="hidden-md-and-up">Contact / PC / Monster / Leader
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-id-card" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Contact</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Contact Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-user-circle" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>PC</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Player Character Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-pastafarianism" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Monster</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Monster Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-hiking" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Leader</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Leader Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <!-- Right column -->
                      <v-flex d-flex md6>
                        <v-list two-line>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Place / Location / Building</v-list-tile-title>
                              <v-list-tile-sub-title>These sub options belongs to
                                <br class="hidden-md-and-up">Place / Location / Building
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img
                                class="speed-dial-icon"
                                contain
                                src="/buttons/place.png"
                                style="width:50px;"
                              >
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Place</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Place Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-hotel" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Building</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Building Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Event / Dark Secret / Object</v-list-tile-title>
                              <v-list-tile-sub-title>These sub options belongs to
                                <br class="hidden-md-and-up">Event / Dark Secret / Object
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-ghost" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Dark Secret</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Dark Secret Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img
                                class="speed-dial-icon"
                                contain
                                src="/buttons/event.png"
                                style="width:50px;"
                              >
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Event</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Event Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-guitar" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Object</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Object Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Group / Organization</v-list-tile-title>
                              <v-list-tile-sub-title>These sub options belongs to
                                <br class="hidden-md-and-up">Group / Organization
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <img
                                class="speed-dial-icon"
                                contain
                                src="/buttons/group.png"
                                style="width:50px;"
                              >
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Organization</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Organization Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="fas fa-users" style="color:red !important"></v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Group</v-list-tile-title>
                              <v-list-tile-sub-title>Creates Group Hub</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2" :key="2">
              <v-card flat>
                <v-card-text>Coming soon ...</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-3" :key="3">
              <v-card flat>
                <v-card-text>Coming soon ...</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
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
    async onOpen() {},
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
.v-divider {
  border-color: transparent;
}
@media screen and (min-width: 500px) {
}
</style>