<template>
  <div id="forgotPassword">
    <v-card class="forgot-password-card">
      <v-card-title>
        Forgot your password?
      </v-card-title>
      <v-card-text>
        <p>
          Enter your email below and we'll send you a reset link.
        </p>

        <v-layout row v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-layout>

        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-text-field
            ref="form"
            v-model="email"
            placeholder="Email"
          ></v-text-field>
        </v-flex>

        <section id="registrationErrors" v-if="errors.length">
          <b>Please fix the following error(s):</b>
          <ul class="errors-list">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </section>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="red" @click="resetForm">Clear form</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="green" @click="validateForm">Send</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      errors: []
    };
  },

  computed: {
    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    validateForm() {
      this.errors = [];

      if (!this.email) {
        this.errors.push("No email provided");
      } else if (!this.checkValidEmail(this.email)) {
        this.errors.push("Email does not meet criteria.");
      } else {
        this.submitEmail();
      }
    },

    checkValidEmail(email) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return regex.test(this.email);
    },

    submitEmail(e) {
      console.log(this.email);
      this.$store.dispatch("resetPassword", {
        email: this.email
      });
    },
    resetForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.forgot-password-card {
  width: 75%;
  margin: 8% auto;
}
</style>
