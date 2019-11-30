<template>
  <div id="header">
    <v-card class="app-header" tile>
      <div>
        <h1 class="app-name">
          <span class="mdi mdi-hand"></span> Choose a Student
        </h1>
      </div>

      <div class="nav">
        <router-link
          v-for="link in menuLinks"
          :key="link.title"
          :to="link.link"
        >
          <v-btn>{{ link.title }}</v-btn>
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      userId: null
    };
  },

  computed: {
    menuLinks() {
      let menuLinks = [
        { icon: "face", title: "Home", link: "/" },
        { icon: "about", title: "About", link: "/about" }
      ];
      if (this.userIsAuthenticated) {
        menuLinks = [
          { icon: "profile", title: "username", link: "/user" },
          { icon: "about", title: "About", link: "/about" },
          { icon: "signout", title: "Sign Out", link: "/" }
        ];
      }
      return menuLinks;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },

  watch: {
    user(value) {
      return value;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.go({ path: this.$router.path });
    }
  }
};
</script>

<style scoped>
.app-header {
  background-color: green;
}
.app-name {
  text-align: center;
  background-color: green;
}
.nav {
  text-align: center;
  background-color: lawngreen;
}
a {
  margin: 5%;
  text-decoration: none;
}
</style>
