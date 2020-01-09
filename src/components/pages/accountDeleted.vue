<template>
  <div id="accountDeleted">
    <v-card class="account-deleted-card">
      <h1 class="page-header">Your account has been deleted.</h1>
      <v-divider></v-divider>
      <p>Sorry to see you go.</p>
      <p>Should you wish to come back, you'll have to create a new account.</p>
      <router-link to="/">
        <h1>Home</h1>
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AccounteDeleted",

  date() {
    return {};
  }
};
</script>

<style scoped>
.account-deleted-card {
  width: 55%;
  margin: 5% auto;
  text-align: center;
}
.page-header {
  margin-top: 5%;
}
a {
  text-decoration: none;
  color: blue;
}
</style>
