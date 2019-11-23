<template>
  <v-app :dark="setTheme">
    <v-content>
      <Header />
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

export default {
  name: "App",

  components: {
    Header,
    Home,
    Footer
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
  position: absolute;
}
</style>
