<template>
  <div id="profile">
    <div id="profileHeader">
      <h1><span class="mdi mdi-account-circle"></span> Hello, Professor {name goes here}</h1>
    </div>

    <div class="buttons-div">
      <AddClassDialog :classList="classList" />
    </div>

    <h1 class="sub-header">Here are your classes:</h1>

    <div class="courses-display">
      <ClassCard
        class="single-card"
        v-for="(single_class, index) in classList"
        :key="single_class.id"
        :CourseName="single_class.courseName"
        :id="single_class.id"
        :classList="classList"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import ClassCard from "../layout/ClassCard";
import AddClassDialog from "../Dialogs/addAClass";

export default {
  name: "Profile",
  components: {
    ClassCard,
    AddClassDialog
  },
  data() {
    return {
      classList: []
    };
  },
  created() {
    db.collection("courses")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            courseName: doc.data().courseName
          };
          this.classList.push(data);
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