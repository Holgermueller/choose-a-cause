<template>
  <div id="resetPassword">
    <v-card class="reset-password">
      <v-card-title>
        Reset your password here
      </v-card-title>
      <v-card-text>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-text-field
            v-model="password"
            placeholder="New Password"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-text-field
            v-model="confirmPassword"
            placeholder="Confirm New Password"
          ></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-btn> Clear form</v-btn>
        <v-spacer></v-spacer>
        <v-btn>
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      errors: []
    };
  },
  methods: {}
};
</script>

<style scoped>
.reset-password {
  width: 75%;
  margin: 8% auto;
}
</style>
