<template>
  <div id="login">
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="usernameOrEmail"
          label="Username or Email"
          outlined
          prepend-icon="mdi-account-circle"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          :type="show_password ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
        ></v-text-field>
      </v-flex>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" @click="clearLoginForm" class="white--text">
        <span class="mdi mdi-close-circle"></span>Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" class="white--text" @click="getLoginData">
        <span class="mdi mdi-check-bold"></span>
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  data() {
    return {
      usernameOrEmail: null,
      password: null,
      show_password: false
    };
  },
  methods: {
    getLoginData() {
      console.log("click");
    },
    clearLoginForm() {
      this.$refs.form.reset();
    }
  }
};
</script>