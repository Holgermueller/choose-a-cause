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
        <v-text-field
          prepend-icon="mdi-email"
          v-model="email"
          label="E-mail*"
          outlined
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="password"
          label="Password*"
          outlined
          :type="show_password ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          hint="Must have at least one capital letter, one symbol, one number, and at least 8 characters."
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
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </section>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" @click="clearRegistrationForm" class="white--text">
        <span class="mdi mdi-close-circle white--text"></span>
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        @click.prevent="checkRegistrationData"
        class="white--text"
      >
        <span class="mdi mdi-check-bold white--text"></span>
        Register
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import firebase from "firebase";

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
      } else if (!this.checkValidEmail(this.email)) {
        this.errors.push("Invalid email.");
      } else if (!this.password) {
        this.errors.push("Password required.");
      } else if (!this.isPasswordValid(this.password)) {
        this.errors.push("Password does not meet criteria.");
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

    checkEmailExistsInDatabase(email) {
      console.log(email);
    },

    isPasswordValid(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return regex.test(this.password);
    },

    checkPasswordExistsInDatabase(password) {
      console.log(password);
    },

    registerUser(e) {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      };

      console.log(newUser);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`Account created for: ${newUser.email}`);
          //this.$router.push('/');
        })
        .catch(err => {
          console.log("Error: " + err.message);
        });
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
