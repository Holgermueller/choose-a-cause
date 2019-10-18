<template>
  <div id="profile">
    <AddClassDialog :classList="classList" />

    <h1>Classes will appear below.</h1>

    <ClassCard v-for="single_class in classList" :key="single_class.id" />
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import ClassCard from "../layout/ClassCard";
import AddClassDialog from "../../forms/addAClass";

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
    db.collection("classes")
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        // querySnapshot.forEach(doc => {
        //   console.log(doc);
        //   // const data = {

        //   // }
        // });
      })
      .catch(err => {
        console.log("Error getting document: " + err);
      });
  },
  methods: {}
};
</script>

<style scoped>
</style>