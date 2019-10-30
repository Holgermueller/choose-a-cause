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
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" @click="clearRegistrationForm" class="white--text">
        <span class="mdi mdi-close-circle white--text"></span>
        Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" @click="getRegistrationData" class="white--text">
        <span class="mdi mdi-check-bold white--text"></span>
        Register</v-btn>
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
      valid: true
    };
  },
  methods: {
    getRegistrationData() {
      console.log("click");
    },
    clearRegistrationForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
</style>