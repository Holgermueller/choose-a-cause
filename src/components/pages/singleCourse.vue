<template>
  <div id="roster">
    <h1 class="course-name-display" id="CourseNameDisplay" :title="courseName">
      {{ courseName }} Roster:
    </h1>

    <div class="name-display-div">
      <NameDisplay :courseRoster="courseRoster" />
    </div>

    <div class="add-student-div">
      <AddStudentDialog :courseId="courseId" :courseRoster="courseRoster" />
    </div>

    <div class="back-button">
      <router-link to="/user">
        <v-btn color="primary" block>
          <span class="mdi mdi-view-dashboard"></span> Back to dashboard
        </v-btn>
      </router-link>
    </div>

    <v-expansion-panels class="expansion-panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="panel-header"
          >See Roster</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <div class="roster-display">
            <RosterCard
              class="roster-card"
              v-for="(singleStudent, index) in courseRoster"
              :key="singleStudent.studentId"
              :firstName="singleStudent.firstName"
              :lastName="singleStudent.lastName"
              :preferredName="singleStudent.preferredName"
              :index="index"
              :studentId="singleStudent.studentId"
              :courseRoster="courseRoster"
              :courseId="courseId"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="delete-all-div">
      <DeleteAllStudentsDialog />
    </div>
  </div>
</template>

<script>
import RosterCard from "../layout/RosterCard";
import AddStudentDialog from "../Dialogs/addAStudent";
import NameDisplay from "../layout/NameDisplay";
import DeleteAllStudentsDialog from "../Dialogs/deleteAllStudents";

export default {
  name: "SingleCourse",

  components: {
    RosterCard,
    AddStudentDialog,
    NameDisplay,
    DeleteAllStudentsDialog
  },

  props: {
    courseId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      courseName: this.$route.params.courseName
    };
  },

  created() {
    return this.$store.dispatch("getCourseRoster", {
      courseId: this.courseId
    });
  },

  computed: {
    courseRoster() {
      return this.$store.getters.courseRoster;
    },

    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
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
.delete-all-div {
  width: 75%;
  margin: 2% auto;
}
</style>
