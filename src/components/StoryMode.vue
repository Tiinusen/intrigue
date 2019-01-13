<template>
  <v-container fill-height fluid>
    <v-layout fill-height>
      <v-flex style="text-align:center;">
        <span class="date">{{ displayTime | moment("YYYY-MM-DD ddd") }}</span><br/>
        <span class="time">{{ displayTime | moment("h:mm A") }}</span><br/>
        <span class="subtitle"></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
let props = [];
export default {
  watch: {},
  components: {},
  props: {},
  data() {
    return {
      initialized: false,
      displayTime: new Date(),
      sessionTime: this.$store.state.session.time
    };
  },
  computed: {
    time() {
      return new Date();
    }
  },
  methods: {},
  mounted() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      while (true) {
        let diff = false;
        let newTime = new Date(this.$store.state.session.time.getTime());
        // Performs fast forward / backward to reach session time (to give a nice transition)
        // Year
        if (newTime.getFullYear() > this.displayTime.getFullYear()) {
          diff = true;
          this.displayTime.setFullYear(this.displayTime.getFullYear() + 1);
        } else if (newTime.getFullYear() < this.displayTime.getFullYear()) {
          diff = true;
          this.displayTime.setFullYear(this.displayTime.getFullYear() - 1);
        }
        // Month
        if (newTime.getMonth() > this.displayTime.getMonth()) {
          diff = true;
          this.displayTime.setMonth(this.displayTime.getMonth() + 1);
        } else if (newTime.getMonth() < this.displayTime.getMonth()) {
          diff = true;
          this.displayTime.setMonth(this.displayTime.getMonth() - 1);
        }
        // Day
        if (newTime.getDate() > this.displayTime.getDate()) {
          diff = true;
          this.displayTime.setDate(this.displayTime.getDate() + 1);
        } else if (newTime.getDate() < this.displayTime.getDate()) {
          diff = true;
          this.displayTime.setDate(this.displayTime.getDate() - 1);
        }
        // Hour
        if (newTime.getHours() > this.displayTime.getHours()) {
          diff = true;
          this.displayTime.setHours(this.displayTime.getHours() + 1);
        } else if (newTime.getHours() < this.displayTime.getHours()) {
          diff = true;
          this.displayTime.setHours(this.displayTime.getHours() - 1);
        }
        // Minute
        if (newTime.getMinutes() > this.displayTime.getMinutes()) {
          diff = true;
          this.displayTime.setMinutes(this.displayTime.getMinutes() + 1);
        } else if (newTime.getMinutes() < this.displayTime.getMinutes()) {
          diff = true;
          this.displayTime.setMinutes(this.displayTime.getMinutes() - 1);
        }
        // Second
        if (newTime.getSeconds() > this.displayTime.getSeconds()) {
          diff = true;
          this.displayTime.setSeconds(this.displayTime.getSeconds() + 1);
        } else if (newTime.getSeconds() < this.displayTime.getSeconds()) {
          diff = true;
          this.displayTime.setSeconds(this.displayTime.getSeconds() - 1);
        }
        if (diff) {
          this.displayTime = new Date(this.displayTime.getTime());
        }
        await new Promise(resolve => setTimeout(resolve, diff ? 100 : 1000));
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
  top:-0.3em;
}
</style>
