<template>
  <div id="profile">
    <div id="profileHeader">
      <h1>
        <span class="mdi mdi-account-circle"></span> Hello, Professor {name goes
        here}
      </h1>
    </div>

    <div class="buttons-div">
      <AddCourseDialog :CourseList="CourseList" />
    </div>

    <h1 class="sub-header">Here are your classes:</h1>

    <div class="courses-display">
      <CourseCard
        class="single-card"
        v-for="(single_course, index) in CourseList"
        :key="single_course.CourseId"
        :CourseName="single_course.CourseName"
        :CourseId="single_course.CourseId"
        :CourseList="CourseList"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import CourseCard from "../layout/CourseCard";
import AddCourseDialog from "../Dialogs/addACourse";

export default {
  name: "Profile",
  components: {
    CourseCard,
    AddCourseDialog
  },
  data() {
    return {
      CourseList: []
    };
  },
  created() {
    db.collection("courses")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            CourseId: doc.id,
            CourseName: doc.data().courseName
          };
          this.CourseList.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting document: " + err);
      });
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
