<template>
  <div id="roster">
    <h1>Roster Will appear here.</h1>
    <p>{{id}}</p>
    <v-btn>
      <router-link to="/user/:id">Back</router-link>
    </v-btn>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "singleClass",
  data() {
    return {
      classRoster: []
    };
  },
  created() {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>