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
        <router-link to="/logout">Logout</router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {}
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
