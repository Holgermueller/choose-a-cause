<template>
  <div id>
    <v-hover v-for="charity in charities_array" :key="charity.ein">
      <v-card class="info-card" tile>
        <h1>{{charity.charityName}}</h1>
        <hr />
        <p>{{charity.mailingAddress.city}}</p>
        <p>{{charity.mailingAddress.stateOrProvince}}</p>
        <v-card-actions>
          <v-btn :id="charity.ein" @click="learnMore">Learn more</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    charities_array: {
      type: Array,
      required: true
    },
    methods: {
      learnMore() {
        let targetId = event.currentTarget.id;
        console.log("targetId");
      }
    }
  }
};
</script>

<style scoped>
.info-card {
  width: 85%;
  margin: 2% auto;
}
</style>
