<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-card :elevation="hover?12:2">
        <h1 class="course-name">{{courseName}}</h1>
        <v-btn :id="id" @click="goToRoster">
          See roster
        </v-btn>
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
    courseName: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    goToRoster() {
      let targetId = event.currentTarget.id;
      console.log(targetId);
    }
  },
};
</script>

<style scoped>
.course-name {
  margin-left: 4%;
  padding: 2%;
}
</style>