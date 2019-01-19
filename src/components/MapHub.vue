<template>
  <!-- Cursor -->
  <l-marker
    :lat-lng="hubP.latlng"
    @click="$emit('click', $event)"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @update:latLng="$emit('update', $event)"
    :zIndexOffset="selected?2000:0"
    :draggable="showMenu"
  >
    <l-icon :icon-anchor="[50, 50]">
      <img :src="hubP.hub.url" class="cursor-image">
      <!-- 2 Buttons (Confirm) -->
      <v-sheet height="150" width="150" class="cursor-sheet">
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Edit"
          style="left:-25px;top:-25px;"
          v-show="showConfirm"
          :onclick="proxy(onConfirmYesClick)"
        >
          <v-icon class="fas fa-check" style="color:red !important"></v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Link"
          style="left:100px;top:-25px;"
          v-show="showConfirm"
          :onclick="proxy(onConfirmNoClick)"
        >
          <v-icon class="fas fa-times" style="color:red !important"></v-icon>
        </v-btn>
        <!-- 4 Buttons -->
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Edit"
          style="left:-25px;top:-25px;"
          v-show="showMenu"
          :onclick="proxy(onEditClick)"
        >
          <v-icon class="fas fa-edit" style="color:red !important"></v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Link"
          style="left:100px;top:-25px;"
          v-show="showMenu"
          :onclick="proxy(onLinkClick)"
        >
          <v-icon class="fas fa-link" style="color:red !important"></v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Remove"
          style="left:100px;top:100px;"
          v-show="showMenu"
          :onclick="proxy(onDeleteClick)"
        >
          <v-icon class="fas fa-trash-alt" style="color:red !important"></v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          large
          absolute
          flat
          color="red"
          title="Wizard"
          style="left:-25px;top:100px;"
          v-show="showMenu && hubP.hub.hubType.indexOf('.') === -1"
          :onclick="proxy(onWizardClick)"
        >
          <v-icon class="fas fa-hat-wizard" style="color:red !important"></v-icon>
        </v-btn>
      </v-sheet>
    </l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from "vue2-leaflet"
import { proxy } from "../utils/Proxy";

export default {
  components: {
    LMarker,
    LIcon
  },
  props: ["hubP", "selected"],
  data() {
    return {};
  },
  methods: {
    proxy,
    onEditClick(){
      this.$emit('click:edit', this.hubP.hub);
    },
    onLinkClick(){
      this.$emit('click:link', this.hubP.hub);
    },
    onWizardClick(){
      this.$emit('click:wizard', this.hubP.hub);
    },
    onDeleteClick(){
      this.$emit('click:delete', this.hubP.hub);
    },
    onConfirmYesClick(){
      this.$emit('click:confirm', this.hubP.hub, true);
    },
    onConfirmNoClick(){
      this.$emit('click:confirm', this.hubP.hub, false);
    },
  },
  computed: {
    showConfirm(){
      return this.selected && this.$root.Map.hubConfirmResolve !== null;
    },
    showMenu(){
      return this.selected && this.$root.Map.hubConfirmResolve === null;
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
