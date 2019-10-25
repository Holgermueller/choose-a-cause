<template>
  <div id="profile">
    <div class="buttons-div">
      <AddClassDialog :classList="classList" />
    </div>

    <h1>Your classes:</h1>

    <div class="courses-display">
      <ClassCard
        class="single-card"
        v-for="(single_class, index) in classList"
        :key="single_class.id"
        :courseName="single_class.courseName"
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