<template>
  <div id="header">
    <v-card class="app-header" tile>
      <div>
        <h1 class="app-name">
          <span class="mdi mdi-hand"></span> Choose a Student
          <DarkModeToggle class="toggle" />
        </h1>
      </div>

      <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/user/:id">Login</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/logout">Logout</router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
import DarkModeToggle from "../buttons/darkModeToggle";

export default {
  name: "Header",
  components: {
    DarkModeToggle
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
.toggle {
  float: right;
  margin: 0 8px 4px 0;
}
</style>
