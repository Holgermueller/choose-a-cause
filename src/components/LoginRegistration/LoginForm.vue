<template>
  <div id="login">
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="email"
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

    <section id="loginErrorDisplay" v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="errors-list">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </section>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" @click="clearLoginForm" class="white--text">
        <span class="mdi mdi-close-circle"></span>Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" class="white--text" @click="checkLoginData">
        <span class="mdi mdi-check-bold"></span>
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";

export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null,
      show_password: false,
      errors: []
    };
  },
  methods: {
    checkLoginData() {
      this.errors = [];

      if (!this.email && !this.password) {
        this.errors.push("All fields must be filled out to continue.");
      } else if (!this.email) {
        this.errors.push("Username or email required.");
      } else if (!this.password) {
        this.errors.push("Password required.");
      } else if (!this.checkEmailValid(this.email)) {
        this.errors.push("Invalid email.");
      } else if (!this.checkPasswordValid(this.password)) {
        this.errors.push("Invalid password.");
      } else {
        this.loginUser();
        this.clearLoginForm();
      }
    },
    checkEmailValid(email) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return regex.test(this.email);
    },
    checkPasswordValid(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return regex.test(this.password);
    },
    loginUser() {
      const userLoginInfo = {
        email: this.email,
        password: this.password
      };
      console.log(userLoginInfo);
      console.log("User logged in.");
    },
    clearLoginForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
#loginErrorDisplay {
  text-align: center;
  color: red;
  margin: 2% 0;
}
.errors-list {
  list-style: none;
}
</style>
