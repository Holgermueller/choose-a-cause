<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-card :elevation="hover?12:2">
        <h1 class="course-name">{{courseName}}</h1>
        <v-card-actions>
          <v-btn :id="id" @click="deleteClass(index)">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn :id="id" :courseName="courseName" @click="goToRoster">
            <router-link :to="/singleClass/+ id">See roster</router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

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
    },
    classList: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToRoster() {
      let targetId = event.currentTarget.id;
      console.log(targetId);
    },
    deleteClass(index) {
      this.classList.splice(index, 1);

      let targetId = event.currentTarget.id;

      db.collection("courses")
        .doc(targetId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(err => {
          console.error("Error removing document: " + err);
        });
    }
  }
};
</script>

<style scoped>
.course-name {
  margin-left: 4%;
  padding: 2%;
}
</style>