<template>
  <v-container style="text-align:center">
    <v-layout row>
      <v-flex>
        <span class="date">{{ displayTime | moment("YYYY-MM-DD dddd") }}</span>
        <br>
        <span class="time">{{ displayTime | moment("HH:mm") }}</span>
        <br>
        <span class="subtitle"></span>
      </v-flex>
    </v-layout>
    <v-layout row style="position:relative;top:-2em;">
      <v-flex class="story-mode-icons">
        <i class="fas fa-clock" title="Change Time" @click="onChangeTimeClick"></i>
        <i class="far fa-calendar-alt" title="Change Date" @click="onChangeDateClick"></i>
        <i class="fas fa-history" title="Show timeline" @click="onShowTimelineClick"></i>
        <i
          class="fas fa-step-forward"
          title="Fast-forward time 15 minutes"
          @click="onForward15MinutesClick"
        ></i>
        <i
          class="fas fa-fast-forward"
          title="Fast-forward time 1 hour"
          @click="onForward1HourClick"
        ></i>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import { Scene } from '../models/Scene'

function tickNormal(src, dst) {
  if (src < dst) {
    return src + 1;
  } else if (src > dst) {
    return src - 1;
  }
  return src;
}

function tickTime(src, dst) {
  let diffInSeconds = (dst.getTime() - src.getTime()) / 1000;
  let diffInSecondsABS = Math.abs(diffInSeconds);
  let srcIsLessThanDst = diffInSeconds > 0;
  if (diffInSecondsABS < 60) {
    // Less than a minute
    if (srcIsLessThanDst) {
      src.setSeconds(src.getSeconds() + 1);
    } else {
      src.setSeconds(src.getSeconds() - 1);
    }
  } else if (diffInSecondsABS < 60 * 60) {
    // Less than a hour
    if (srcIsLessThanDst) {
      src.setMinutes(src.getMinutes() + 1);
    } else {
      src.setMinutes(src.getMinutes() - 1);
    }
  } else if (diffInSecondsABS < 60 * 60 * 24) {
    // Less than a day
    if (srcIsLessThanDst) {
      src.setHours(src.getHours() + 1);
    } else if (dst.getHours() !== 0) {
      src.setHours(src.getHours() - 1);
    } else {
      src.setHours(dst.getHours());
    }
  }
}

/**
 * Gives the date transition a digital ticking behaviour
 */
function tickDate(src, dst) {
  if (Math.abs(src.getTime() - dst.getTime()) < 60 * 1000) {
    if (src.getTime() !== dst.getTime()) {
      src.setSeconds(dst.getSeconds());
      src.setMilliseconds(dst.getMilliseconds());
      return true;
    }
    return false;
  }
  src.setFullYear(tickNormal(src.getFullYear(), dst.getFullYear()));
  src.setMonth(tickNormal(src.getMonth(), dst.getMonth()));
  src.setDate(tickNormal(src.getDate(), dst.getDate()));
  tickTime(src, dst);
  return true;
}

let props = [];
export default {
  watch: {},
  components: {},
  props: {},
  data() {
    return {
      initialized: false,
      displayTime: new Date("2018-11-21T06:44:00Z")
    };
  },
  computed: {
    time() {
      return new Date();
    }
  },
  methods: {
    onChangeTimeClick() {
      alert("Not yet implemented");
    },
    onChangeDateClick() {
      alert("Not yet implemented");
    },
    onShowTimelineClick() {
      alert("Not yet implemented");
    },
    onForward15MinutesClick() {
      let scene = new Scene(this.$root.Map.activeScene);
      scene.time = Vue.moment(scene.time)
        .add(15, "minutes")
        .toDate();
      this.$store.commit(scene);;
      this.$store.commit("google/setSessionLastModified", new Date());
    },
    onForward1HourClick() {
      let scene = new Scene(this.$root.Map.activeScene);
      scene.time = Vue.moment(scene.time)
        .add(1, "hour")
        .toDate();
      this.$store.commit(scene);;
      this.$store.commit("google/setSessionLastModified", new Date());
    }
  },
  mounted() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    (async () => {
      while (true) {
        if (
          typeof this.$root.Map === "undefined" ||
          this.$root.Map.activeScene === null
        ) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        let diff = tickDate(this.displayTime, this.$root.Map.activeScene.time);
        if (diff) {
          this.displayTime = new Date(this.displayTime.getTime());
        }
        await new Promise(resolve => setTimeout(resolve, diff ? 100 : 500));
      }
    })();
  }
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}
.date {
  font-size: 1.5em;
}
.time {
  position: relative;
  font-size: 4em;
  top: -0.3em;
}
.story-mode-icons i {
  font-size: 3em;
  margin-left: 0.25em;
  margin-right: 0.25em;
  cursor: pointer;
}
.story-mode-icons i:hover {
  color: #ff0000;
}
</style>
