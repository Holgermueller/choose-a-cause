<template>
  <div>
    <v-card>
      <h1>Welcome</h1>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      charities_array: []
    };
  },
  mounted() {
    const apiKey = process.env.VUE_APP_CHARITY_API;
    const applicationID = process.env.VUE_APP_APID;

    axios
      .get(
        "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
          applicationID +
          "&app_key=" +
          apiKey
      )
      .then(res => {
        let allCharities = res.data;
        allCharities.map(charity => {
          this.charities_array.push(charity);
        });
        console.log(this.charities_array[0]);
      })
      .catch(err => {
        console.log("Error:" + err);
      });
  },

  methods: {}
};
</script>

<style scoped>
</style>