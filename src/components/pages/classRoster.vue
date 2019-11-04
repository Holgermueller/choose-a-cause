<template>
  <div id="roster">
    <h1
      class="course-name-display"
      id="courseNameDisplay"
      :title="CourseName"
    >{{CourseName}} Roster:</h1>
    <p>{{id}}</p>

    <div class="name-display-div">
      <NameDisplay :classRoster="classRoster" />
    </div>

    <div class="add-student-div">
      <AddStudentDialog :id="id" :classRoster="classRoster" />
    </div>

    <div class="back-button">
      <router-link to="/user/:id">
        <v-btn color="primary" block><span class="mdi mdi-view-dashboard"></span> Back to dashboard</v-btn>
      </router-link>
    </div>

    <v-expansion-panels class="expansion-panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="panel-header">See Roster</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="roster-display">
            <RosterCard
              class="roster-card"
              v-for="(single_student, index) in classRoster"
              :key="single_student.studentId"
              :firstname="single_student.firstName"
              :index="index"
              :studentId="single_student.studentId"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import RosterCard from "../layout/RosterCard";
import AddStudentDialog from "../Dialogs/addAStudent";
import NameDisplay from "../layout/NameDisplay";

export default {
  name: "singleClass",
  components: {
    RosterCard,
    AddStudentDialog,
    NameDisplay
  },
  data() {
    return {
      classRoster: [],
      CourseName: this.$route.params.CourseName,
      newCourseName: ""
    };
  },

  props: {
    id: {
      type: String,
      required: true
    }
    // CourseName: {
    //   type: String,
    //   required: true
    // }
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
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  },
  mounted() {
    console.log("Course page mounted.");
    if (localStorage.getItem("CourseName")) {
      this.CourseName = JSON.parse(
        localStorage.getItem("CourseName", this.CourseName)
      );
    }
  },
  watch: {
    CourseName: {
      handler() {
        console.log("Course name changed");
        localStorage.setItem("CourseName", JSON.stringify(this.CourseName));
      },
      deep: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.course-name-display {
  padding: 5%;
  text-align: center;
}
.name-display-div {
  width: 85%;
  margin: 4% auto;
}
.roster-display {
  width: 75%;
  margin: 2px auto;
}
.roster-card {
  margin: 2% 0;
}
.back-button {
  width: 75%;
  margin: 2% auto;
}
a {
  text-decoration: none;
}
.add-student-div {
  width: 75%;
  margin: 2% auto;
}
.expansion-panel {
  width: 75%;
  margin: 8px auto 16px auto;
}
.panel-header {
  background-color: aqua;
}
</style>