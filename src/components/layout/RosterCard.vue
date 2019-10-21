<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-card :elevation="hover?12:2">
        <h1>{{firstname}}</h1>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { type } from "os";
export default {
  data() {
    return {};
  },
  props: {
    firstname: {
      type: String,
      required: true
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>