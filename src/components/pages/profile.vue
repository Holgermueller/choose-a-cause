<template>
  <div id="profile">
    <div id="profileHeader">
      <h1>
        <span class="mdi mdi-account-circle"></span> Hello, Professor
        {{ displayName }}
      </h1>
    </div>

    <div class="buttons-div">
      <UpdateUserInfoDialog :displayName="displayName" />
    </div>

    <div class="buttons-div">
      <AddCourseDialog :courseList="courseList" />
    </div>

    <h1 class="sub-header">Here are your classes:</h1>

    <div class="courses-display" :loading="loading" :disabled="loading">
      <v-layout row v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-layout>

      <v-layout class="progress">
        <v-flex class="tet-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"
            v-if="loading"
          ></v-progress-circular>
        </v-flex>
      </v-layout>

      <CourseCard
        class="single-card"
        v-for="(singleCourse, index) in courseList"
        :key="singleCourse.courseId"
        :courseName="singleCourse.courseName"
        :courseId="singleCourse.courseId"
        :courseList="courseList"
        :index="index"
      />
    </div>

    <div class="buttons-div">
      <DeleteUserDialog :displayName="displayName" />
    </div>
  </div>
</template>

<script>
import CourseCard from "../layout/CourseCard";
import AddCourseDialog from "../Dialogs/addACourse";
import UpdateUserInfoDialog from "../Dialogs/updateUsername";
import DeleteUserDialog from "../Dialogs/deleteUserProfile";

export default {
  name: "Profile",

  components: {
    CourseCard,
    AddCourseDialog,
    UpdateUserInfoDialog,
    DeleteUserDialog
  },

  created() {
    return this.$store.dispatch("getCourseListFromDB");
  },

  computed: {
    displayName() {
      return this.$store.getters.user.displayName;
    },

    courseList() {
      return this.$store.getters.courseList;
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
#profileHeader {
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;
}
.sub-header {
  text-align: center;
}
.buttons-div {
  width: 75%;
  margin: 5% auto;
}
.courses-display {
  width: 75%;
  margin: 2% auto;
}
.single-card {
  margin: 2% 0;
}
.progress {
  margin: 1% auto;
}
</style>
