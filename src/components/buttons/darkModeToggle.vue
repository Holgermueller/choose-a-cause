<template>
  <div id="darkModeToggle" :dark="setTheme" @click="setTheme">
    <v-switch label="Dark Mode"> </v-switch>
  </div>
</template>

<script>
import DarkModeTooltip from "./darkModeTooltip";

export default {
  name: "DarkModeSwitch",
  components: { DarkModeTooltip },
  props: ["dark"],
  opts: {
    theme: {
      dark: false
    }
  },
  data() {
    return {
      goDark: false
    };
  },
  methods: {
    setTheme() {
      if (this.goDark == true) {
        console.log("theme change");
        return (this.$vuetify.theme.dark = true);
      } else {
        console.log("theme changed");
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>

<style scoped>
#darkModeToggle {
  margin-left: 4%;
}
/* .tool-tip {
  float: right;
} */
</style>
