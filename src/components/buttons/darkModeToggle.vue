<template>
  <div id="darkModeToggle">
    <v-switch label="Dark Mode"> </v-switch>
  </div>
</template>

<script>
import DarkModeTooltip from "./darkModeTooltip";

export default {
  name: "DarkModeSwitch",
  components: { DarkModeTooltip },
  props: {},
  data() {
    return {};
  }
};
</script>

<style scoped>
/* .tool-tip {
  float: right;
} */
</style>
