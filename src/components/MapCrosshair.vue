<template>
  <l-marker
    :lat-lng="latlng"
    @click="$emit('click', $event);displayDefaultButtons();"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    v-if="visible"
    :zIndexOffset="3000"
  >
    <l-icon :icon-anchor="[50, 50]">
      <v-img src="/cursor.png" class="cursor-image"/>
      <!-- Default Buttons -->
      <v-sheet height="0" width="0" class="cursor-sheet" v-show="showDefaultButtons">
        <!-- Up Left -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Contact / PC / Monster / Leader"
          style="left:-25px;top:-25px;"
          :onclick="proxy(displayEntityButtons)"
        >
          <v-icon class="fas fa-user" style="color:red !important"></v-icon>
        </v-btn>
        <!-- Up Right -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Place"
          style="left:100px;top:-25px;"
          :onclick="proxy(displayPlaceButtons)"
        >
          <img class="speed-dial-icon" contain src="/icons/place.png" style="width:50px;">
        </v-btn>
        <!-- Bottom Right -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Event / Dark Secret / Object"
          style="left:100px;top:100px;"
          :onclick="proxy(displayEventButtons)"
        >
          <img class="speed-dial-icon" contain src="/icons/event.png" style="width:50px;">
        </v-btn>
        <!-- Bottom Left -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Group / Organization"
          style="left:-25px;top:100px;"
          :onclick="proxy(displayGroupOrganizationButtons)"
        >
          <v-icon class="fas fa-users" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
      <!-- Entity Buttons -->
      <v-sheet height="0" width="0" class="cursor-sheet" v-show="showEntityButtons">
        <!-- Top -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Contact"
          style="left:38px;top:-25px;"
          :onclick="proxy(onContactClick)"
        >
          <v-icon class="fas fa-id-card" style="color:red !important"></v-icon>
        </v-btn>
        <!-- Right -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add PC"
          style="left:100px;top:38px;"
          :onclick="proxy(onPCClick)"
        >
          <v-icon class="fas fa-user-circle" style="color:red !important"></v-icon>
        </v-btn>
        <!-- Bottom -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Monster"
          style="left:38px;top:100px;"
          :onclick="proxy(onMonsterClick)"
        >
          <v-icon class="fas fa-pastafarianism" style="color:red !important"></v-icon>
        </v-btn>
        <!-- Left -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Leader"
          style="left:-25px;top:38px;"
          :onclick="proxy(onLeaderClick)"
        >
          <v-icon class="fas fa-hiking" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
      <!-- Event / Object -->
      <v-sheet height="0" width="0" class="cursor-sheet" v-show="showEventButtons">
        <!-- Right -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Dark Secret"
          style="left:100px;top:38px;"
          :onclick="proxy(onEventDarkSecretClick)"
        >
          <v-icon class="fas fa-ghost" style="color:red !important"></v-icon>
        </v-btn>
        <!-- Bottom -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Event"
          style="left:38px;top:100px;"
          :onclick="proxy(onEventClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/event.png" style="width:50px;">
        </v-btn>
        <!-- Left -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Object"
          style="left:-25px;top:38px;"
          :onclick="proxy(onObjectClick)"
        >
          <v-icon class="fas fa-guitar" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
      <!-- Group / Organization -->
      <v-sheet height="0" width="0" class="cursor-sheet" v-show="showGroupOrganizationButtons">
        <!-- Bottom -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Organization"
          style="left:38px;top:100px;"
          :onclick="proxy(onOrganizationClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/group.png" style="width:50px;">
        </v-btn>
        <!-- Left -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Group"
          style="left:-25px;top:38px;"
          :onclick="proxy(onGroupClick)"
        >
          <v-icon class="fas fa-users" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
      <!-- Place Buttons -->
      <v-sheet height="0" width="0" class="cursor-sheet" v-show="showPlaceButtons">
        <!-- Top -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add Place"
          style="left:38px;top:-25px;"
          :onclick="proxy(onPlaceClick)"
        >
          <img class="speed-dial-icon" contain src="/icons/place.png" style="width:50px;">
        </v-btn>
        <!-- Right -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Add PC"
          style="left:100px;top:38px;"
          :onclick="proxy(onPlaceBuildingClick)"
        >
          <v-icon class="fas fa-hotel" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
    </l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from "vue2-leaflet";
import { proxy } from "../utils/Proxy";

export default {
  components: {
    LMarker,
    LIcon
  },
  props: ["latlng", "visible"],
  data() {
    return {
      showEntityButtons: false,
      showEventButtons: false,
      showGroupOrganizationButtons: false,
      showPlaceButtons: false
    };
  },
  methods: {
    proxy,
    displayDefaultButtons() {
      this.showEntityButtons = false;
      this.showEventButtons = false;
      this.showGroupOrganizationButtons = false;
      this.showPlaceButtons = false;
    },
    // Entity
    displayEntityButtons() {
      setTimeout(() => {
        this.showEntityButtons = true;
      }, 10);
    },
    onPCClick() {
      this.displayDefaultButtons();
      this.$emit("click:pc");
    },
    onLeaderClick() {
      this.displayDefaultButtons();
      this.$emit("click:leader");
    },
    onMonsterClick() {
      this.displayDefaultButtons();
      this.$emit("click:monster");
    },
    onContactClick() {
      this.displayDefaultButtons();
      this.$emit("click:contact");
    },
    // Event
    displayEventButtons() {
      setTimeout(() => {
        this.showEventButtons = true;
      }, 10);
    },
    onEventClick() {
      this.displayDefaultButtons();
      this.$emit("click:event");
    },
    onEventDarkSecretClick() {
      this.displayDefaultButtons();
      this.$emit("click:event-dark-secret");
    },
    onObjectClick() {
      this.displayDefaultButtons();
      this.$emit("click:object");
    },
    // Place
    displayPlaceButtons() {
      setTimeout(() => {
        this.showPlaceButtons = true;
      }, 10);
    },
    onPlaceClick() {
      this.displayDefaultButtons();
      this.$emit("click:place");
    },
    onPlaceBuildingClick() {
      this.displayDefaultButtons();
      this.$emit("click:place-building");
    },
    // Group / Organization
    displayGroupOrganizationButtons() {
      setTimeout(() => {
        this.showGroupOrganizationButtons = true;
      }, 10);
    },
    onOrganizationClick() {
      this.displayDefaultButtons();
      this.$emit("click:organization");
    },
    onGroupClick() {
      this.displayDefaultButtons();
      this.$emit("click:group");
    }
  },
  computed: {
    showDefaultButtons() {
      return (
        !this.showEntityButtons &&
        !this.showEventButtons &&
        !this.showGroupOrganizationButtons &&
        !this.showPlaceButtons
      );
    },
    show() {
      return false;
    },
    text() {
      if (!this.show) {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.cursor-image {
  width: 100px;
  height: 100px;
}

.cursor-sheet {
  position: relative;
  bottom: 125px;
  right: 25px;
  background-color: transparent;
}
</style>
