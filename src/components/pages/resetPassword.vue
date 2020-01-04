<template>
  <div id="resetPassword">
    <v-card class="reset-password">
      <v-card-title>
        Reset your password here
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form">
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
      </v-form>

        <section id="registrationErrors" ref="errorsDisplay" v-if="errors.length">
      <b>Please fix the following error(s):</b>
      <ul class="errors-list">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </section>
        
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clearForm">Clear form</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="checkFormIsEmpty">
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
  methods: {
    checkFormIsEmpty() {
      this.errors = [];

      if (!this.password && !this.confirmPassword) {
        this.errors.push("Please fill out all of the fields.");
      } else if (!this.password) {
        this.errors.push("New password Required");
      } else if (!this.confirmPassword) {
        this.errors.push("Please confirm your password");
      } else if (this.password !== this.confirmPassword) {
        this.errors.push("Passwords do not match.");
      } else {
        this.errors.push("Successs!");
      }
    },

    isPasswordValid() {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return regex.test(this.password);
    },

    checkIfPasswordIsAlreadyUsed() {},
    
    clearForm(){
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.reset-password {
  width: 75%;
  margin: 8% auto;
}
</style>
