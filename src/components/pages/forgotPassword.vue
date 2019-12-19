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
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-text-field v-model="email" placeholder="Email"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="green" @click="submitEmail">Send</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    submitEmail() {
      console.log(this.email);
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
