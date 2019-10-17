<template>
  <div id>
    <v-hover class="info-card">
      <v-card>
        <h1>{{charityName}}</h1>
        <hr />
        <p>{{city}}</p>
        <p>{{stateOrProvince}}</p>
        <v-card-actions>
          <v-btn :id="id" @click="learnMore">Learn More</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    charityName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: false
    },
    stateOrProvince: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    learnMore: function() {
      const targetId = event.currentTarget.id;
      console.log(targetId);
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
