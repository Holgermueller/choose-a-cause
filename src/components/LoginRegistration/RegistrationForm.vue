<template>
  <div id="register">
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          prepend-icon="mdi-account-circle"
          v-model="username"
          label="Username*"
          outlined
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field prepend-icon="mdi-email" v-model="email" label="E-mail*" outlined></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="password"
          label="Password*"
          outlined
          :type="show_password ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          hint="Must have at least one capital letter, one symbol, and one number."
          persistent-hint
          @click:append="show_password = !show_password"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="confirm_password"
          label="Confirm password*"
          outlined
          :type="show_confirm_password ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_confirm_password = !show_confirm_password"
        ></v-text-field>
      </v-flex>
    </v-form>
    <small>* Indicates required field</small>

    <section id="registrationErrors" v-if="errors.length">
      <b>Please fix the following error(s):</b>
      <ul class="errors-list">
        <li v-for="(error, index) in errors" :key="index">{{error}}</li>
      </ul>
    </section>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" @click="clearRegistrationForm" class="white--text">
        <span class="mdi mdi-close-circle white--text"></span>
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" @click="validate" class="white--text">
        <span class="mdi mdi-check-bold white--text"></span>
        Register
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "RegistrationForm",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirm_password: null,
      show_password: false,
      show_confirm_password: false,
      valid: true,
      errors: []
    };
  },
  methods: {
    checkRegistrationData() {
      this.errors = [];

      if (
        !this.username &&
        !this.email &&
        !this.password &&
        !this.confirm_password
      ) {
        this.errors.push("Please fill out all of the fields.");
      } else if (!this.username) {
        this.errors.push("Username required.");
      } else if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.password) {
        this.errors.push("Password required.");
      } else if (!this.confirm_password) {
        this.errors.push("Password confirmation required.");
      } else if (this.password !== this.confirm_password) {
        this.errors.push("Passwords do not match.");
      } else {
        this.registerUser();
        this.clearRegistrationForm();
      }
    },
    checkValidEmail(email) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return regex.test(this.email);
    },
    validate() {
      this.errors = [];

      if (this.checkValidEmail(this.email)) {
        console.log("Valid!")
      } else {
        this.errors.push("Invalid email.");
        console.log("Invalid!");
      }
    },
    checkPassword() {},
    registerUser() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      };
      console.log(newUser);
    },
    clearRegistrationForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
#registrationErrors {
  margin: 2% 0;
  color: red;
  text-align: center;
}
.errors-list {
  list-style: none;
}
</style>