<template>
  <div id="nameDisplay">
    <v-card>
      <v-card-text>
        <h1 class="displayed-name" id="displayedName">Name will appear here</h1>
      </v-card-text>
      <v-card-actions>
        <v-btn color="amber" class="name-selector" @click="chooseAStudent"
          >Choose a student</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "NameDisplay",
  props: {
    courseRoster: {
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
    chooseAStudent() {
      let courseRoster = this.courseRoster;
      let randomStudent =
        courseRoster[Math.floor(Math.random() * courseRoster.length)];
      let calledArray = this.calledArray;

      if (calledArray.length === courseRoster.length) {
        this.calledArray = [];
        this.chooseAStudent();
      } else if (this.calledArray.includes(randomStudent.preferredName)) {
        this.chooseAStudent();
      } else {
        this.calledArray.push(randomStudent.preferredName);
        document.querySelector("#displayedName").innerHTML =
          randomStudent.preferredName;
      }
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
