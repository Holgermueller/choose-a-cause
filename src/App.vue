<template>
  <v-app :dark="setTheme">
    <v-content>
      <Header />
      <DarkModeToggle />
      <div class="toggle">
        <v-switch label="Dark Mode" v-model="goDark"></v-switch>
      </div>

      <router-view></router-view>
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/index";
import DarkModeToggle from "./components/buttons/darkModeToggle";

export default {
  name: "App",

  components: {
    Header,
    Home,
    Footer,
    DarkModeToggle
  },

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

  computed: {
    setTheme() {
      if (this.goDark == true) {
        console.log("theme change");
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>

<style scoped>
.toggle {
  margin-left: 4%;
  position: absolute;
}
</style>
