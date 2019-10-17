<template>
  <div>
    <!-- <v-card>
      <v-btn>find a charity</v-btn>
    </v-card>-->
    <CharityCard
      v-for="charity in charities_array"
      :key="charity.ein"
      :charityName="charity.charityName"
      :city="charity.mailingAddress.city"
      :stateOrProvince="charity.mailingAddress.stateOrProvince"
      :id="charity.ein"
    />
  </div>
</template>

<script>
import axios from "axios";
import CharityCard from "../components/layout/CharityCard";

export default {
  components: {
    CharityCard
  },
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