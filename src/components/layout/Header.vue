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
          <v-btn color="green"
            ><span :class="link.icon"></span> {{ link.title }}</v-btn
          >
        </router-link>
        <v-btn
          v-if="userIsAuthenticated"
          @click="logout"
          :loading="loading"
          :disabled="loading"
          color="green"
        >
          <span class="mdi mdi-exit-to-app"></span>
          Sign Out
        </v-btn>
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
        { icon: "mdi mdi-home", title: "Home", link: "/" },
        {
          icon: "mdi mdi-book-open-page-variant",
          title: "About",
          link: "/about"
        }
      ];
      if (this.userIsAuthenticated) {
        menuLinks = [
          {
            icon: "mdi mdi-account",
            title: "displayName",
            link: "/user"
          },
          {
            icon: "mdi mdi-book-open-page-variant",
            title: "About",
            link: "/about"
          }
        ];
      }
      return menuLinks;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    displayName() {
      return this.$store.getters.user.displayName;
    },

    loading() {
      return this.$store.getters.loading;
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
