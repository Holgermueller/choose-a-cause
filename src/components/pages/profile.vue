<template>
  <div id="profile">
    <div id="profileHeader">
      <h1>
        <span class="mdi mdi-account-circle"></span> Hello, Professor
        {{ userId }}
      </h1>
    </div>

    <div class="buttons-div">
      <AddCourseDialog :courseList="courseList" />
    </div>

    <h1 class="sub-header">Here are your classes:</h1>

    <div class="courses-display">
      <v-progress-linear
        height="11"
        indeterminate
        rounded
        v-if="loading"
      ></v-progress-linear>

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

export default {
  name: "Profile",

  components: {
    CourseCard,
    AddCourseDialog
  },

  created() {
    console.log(this.$store.getters.loadCourseList);
    console.log(this.$store.getters.user);
    console.log(this.$store.getters.user.userName);
  },

  computed: {
    courseList() {
      return this.$store.getters.loadCourseList;
    },

    userId() {
      return this.$store.getters.user.id;
    },

    userName() {
      return this.$store.getters.user.userName;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {}
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
