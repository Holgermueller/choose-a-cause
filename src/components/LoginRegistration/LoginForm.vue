<template>
  <div id="login">
    <v-layout row v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-layout>
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="email"
          label="Email"
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
      <v-flex xs12 sm12 md12 lg12 xl12>
        <router-link to="/forgotPassword">
          <p>Forgot Password?</p>
        </router-link>
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
      <router-link
        :to="{
          name: 'Profile',
          params: { currentUser: currentUser, userId: userId }
        }"
      >
        <v-btn
          color="blue"
          class="white--text"
          @click.prevent="loginUser"
          :loading="loading"
          :disabled="loading"
        >
          <span class="mdi mdi-check-bold"></span>
          Submit
        </v-btn></router-link
      >
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      show_password: false,
      currentUser: false,
      userId: null,
      errors: []
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },

    error() {
      return this.$store.getters.error;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/user");
      }
    }
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

    loginUser(e) {
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.password,
        userId: this.userId,
        currentUser: this.currentUser
      });
      //this.$router.go({ path: this.$router.path });
    },

    clearLoginForm() {
      this.$refs.form.reset();
    },

    onDismissed() {
      this.$store.dispatch("clearError");
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
