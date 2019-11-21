<template>
  <div id="darkModeToggle">
    <v-switch label="Dark Mode" v-model="goDark"> </v-switch>
  </div>
</template>

<script>
import DarkModeTooltip from "./darkModeTooltip";

export default {
  name: "DarkModeSwitch",
  components: { DarkModeTooltip },
  data() {
    return {
      goDark: false
    };
  },
  computed: {
    setTheme() {
      if (this.goDark === true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>

<style scoped>
/* .tool-tip {
  float: right;
} */
</style>
