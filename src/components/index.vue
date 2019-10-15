<template>
  <div>
    <h1>Hello</h1>

    <v-card>
      <v-btn @click="findCharity">find a charity</v-btn>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      charities: []
    };
  },
  methods: {
    findCharity() {
      const apiKey = process.env.VUE_APP_CHARITY_API;
      const applicationID = process.env.VUE_APP_APID;

      axios.get("https://api.data.charitynavigator.org/v2").then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
</style>