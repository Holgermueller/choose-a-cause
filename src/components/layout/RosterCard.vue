<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-card :elevation="hover?12:2">
        <h1 class="student-name">{{firstname}}</h1>
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
    },
    lastname: {
      type: String,
      required: true
    },
    preferredname: {
      type: String,
      required: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.student-name {
  padding: 2%;
}
</style>