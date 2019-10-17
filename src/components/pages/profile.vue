<template>
  <div id="profile">

    <AddClassDialog />

    <h1>Classes will appear below.</h1>
    
  <ClassCard 
  v-for="single_class in classList" :key="single_class.id"/>

  </div>
</template>

<script>
import ClassCard from "../layout/ClassCard"
import AddClassDialog from "../../forms/addAClass"

export default {
  name: "Profile",
  components: {
    ClassCard,
    AddClassDialog
  },
  data() {
    return{
      classList: [],
    }
  },
  methods: {

  }
};
</script>

<style scoped>
</style>