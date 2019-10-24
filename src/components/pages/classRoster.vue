<template>
  <div id="roster">
    <h1>{{courseName}} Roster:</h1>
    <p>{{id}}</p>

    <router-link to="/user/:id">
      <v-btn>Back</v-btn>
    </router-link>

    <div class="add-student-div">
      <AddStudentDialog
      :id="id" />
    </div>

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
import AddStudentDialog from "../forms/addAStudent";

export default {
  name: "singleClass",
  components: {
    RosterCard,
    AddStudentDialog
  },
  data() {
    return {
      classRoster: [],
      
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
.add-student-div {
  width: 75%;
  margin: 2% auto;
}
</style>