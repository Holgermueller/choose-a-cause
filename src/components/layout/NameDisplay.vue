<template>
  <div id="nameDisplay">
    <v-card>
      <v-card-text>
        <h1 class="displayed-name" id="displayedName">Name will appear here</h1>
      </v-card-text>
      <v-card-actions>
        <v-btn color="amber" class="name-selector" @click="chooseAName">Choose a student</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "NameDisplay",
  props: {
    classRoster: {
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
      let class_roster = this.classRoster;
      let randomStudent =
        class_roster[Math.floor(Math.random() * class_roster.length)];
      let calledArray = this.calledArray;

      if (calledArray.length === class_roster.length) {
        this.calledArray = [];
        this.chooseAName();
      } else if (this.calledArray.includes(randomStudent.firstName)) {
        this.chooseAName();
      } else {
        this.calledArray.push(randomStudent.firstName);
      }

      document.querySelector("#displayedName").innerHTML =
        randomStudent.firstName;
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