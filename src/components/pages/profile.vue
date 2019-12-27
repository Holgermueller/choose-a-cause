<template>
  <div id="profile">
    <div id="profileHeader">
      <h1>
        <span class="mdi mdi-account-circle"></span> Hello, Professor
        {{ username }}
      </h1>
    </div>

    <div class="buttons-div">
      <UpdateUserInfoDialog />
      <AddCourseDialog :courseList="courseList" />
    </div>

    <h1 class="sub-header">Here are your classes:</h1>

    <div class="courses-display" :loading="loading" :disabled="loading">
      <v-layout row v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
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
  </div>
</template>

<script>
import CourseCard from "../layout/CourseCard";
import AddCourseDialog from "../Dialogs/addACourse";
import UpdateUserInfoDialog from "../Dialogs/updateUsername";

export default {
  name: "Profile",

  components: {
    CourseCard,
    AddCourseDialog,
    UpdateUserInfoDialog
  },

  created() {
    return this.$store.dispatch("getCourseListFromDB");
  },

  computed: {
    username() {
      return this.$store.getters.user;
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

  watch: {}
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
</style>
