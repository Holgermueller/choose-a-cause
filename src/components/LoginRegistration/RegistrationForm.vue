<template>
  <div id="register">
    <v-form ref="form">
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field v-model="password" label="password"></v-text-field>
      <v-text-field v-model="confirm_password" label="Confirm password"></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn>Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn>Register</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirm_password: null
    };
  },
  methods: {
    getRegistrationData() {}
  }
};
</script>

<style scoped>
</style>