<template>
  <div>
    <v-switch class="switch" label="Dark Mode" v-model="goDark"> </v-switch>
  </div>
</template>

<script>
export default {
  name: "DarkModeSwitch",
  data() {
    return {
      goDark: false
    };
  },
  computed: {
    setThem() {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>

<style scoped>
.switch {
  margin: 1 auto;
}
</style>
