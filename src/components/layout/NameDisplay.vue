<template>
  <div id="nameDisplay">
    <v-card>
      <v-card-text>
        <h1 class="displayed-name" id="displayedName">Name will appear here</h1>
      </v-card-text>
      <v-card-actions>
        <v-btn color="amber" class="name-selector" @click="chooseAName"
          >Choose a student</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "NameDisplay",
  props: {
    CourseRoster: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      calledArray: []
    };
  },
  methods: {
    chooseAName() {
      let CourseRoster = this.CourseRoster;
      let randomStudent =
        CourseRoster[Math.floor(Math.random() * CourseRoster.length)];
      let calledArray = this.calledArray;

      if (calledArray.length === CourseRoster.length) {
        this.calledArray = [];
        this.chooseAName();
      } else if (this.calledArray.includes(randomStudent.preferredName)) {
        this.chooseAName();
      } else {
        this.calledArray.push(randomStudent.preferredName);
      }

      console.log(randomStudent.preferredName);

      document.querySelector("#displayedName").innerHTML =
        randomStudent.preferredName;
    }
  }
};
</script>

<style scoped>
.displayed-name {
  text-align: center;
  border: 5px ridge gold;
  border-radius: 15px;
  min-height: 125px;
  padding: 8%;
  background-color: gold;
  color: #000;
}
.name-selector {
  margin: 0 auto;
}
</style>
