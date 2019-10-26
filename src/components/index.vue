<template>
  <div>
    <v-card>
      <h1>Welcome</h1>
    </v-card>
    <LoginRegisterForms />
  </div>
</template>

<script>
import axios from "axios";
import LoginRegisterForms from "../components/LoginRegistration/LoginRegistration";

export default {
  components: {
    LoginRegisterForms
  },
  data() {
    return {};
  },
  mounted() {},

  methods: {}
};
</script>

<style scoped>
</style>