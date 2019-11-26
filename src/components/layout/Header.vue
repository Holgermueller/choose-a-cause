<template>
  <div id="header">
    <v-card class="app-header" tile>
      <div>
        <h1 class="app-name">
          <span class="mdi mdi-hand"></span> Choose a Student
        </h1>
      </div>

      <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/user/:id">Login</router-link>
        <router-link to="/about">About</router-link>
        <v-btn @click="logout">Logout</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    logout() {
      console.log("click");
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
