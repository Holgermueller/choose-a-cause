<template>
  <div id="roster">
    <h1>{{courseName}}</h1>
    <p>{{id}}</p>
    <v-btn>
      <router-link to="/user/:id">Back</router-link>
    </v-btn>

<div class="roster-display">
    <RosterCard
    class="roster-card"
      v-for="(single_student, index) in classRoster"
      :key="single_student.id"
      :firstname="single_student.firstName"
      :index="index"
    />
</div>

  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import RosterCard from "../layout/RosterCard";

export default {
  name: "singleClass",
  components: {
    RosterCard
  },
  data() {
    return {
      classRoster: []
    };
  },

  props: {
    id: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    }
  },
  created() {
    db.collection("courses")
      .doc(this.id)
      .collection("roster")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = {
            studentId: doc.id,
            firstName: doc.data().firstname
          };
          this.classRoster.push(data);
        });
      });
  },
  methods: {}
};
</script>

<style scoped>
.roster-display {
  width: 75%;
  margin: 2px auto;
}
.roster-card {
  margin: 2% 0;
}
</style>