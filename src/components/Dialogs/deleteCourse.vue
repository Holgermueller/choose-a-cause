<template>
  <div id="deleteDialog">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="red" v-on="on">Delete</v-btn>
      </template>

      <v-card class="delete-class-dialog">
        <v-card-title class="red">Delete {{CourseName}}?</v-card-title>
        <v-card-text>
          <p>Are you certain you want to delete this course?</p>
          <p>This action cannot be reversed.</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :id="id" @click="deleteCourse(index)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "DeleteCourse",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    CourseName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    classList: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteCourse(index) {
      this.classList.splice(index, 1);

      let targetId = event.currentTarget.id;

      db.collection("courses")
        .doc(targetId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(err => {
          console.error("Error removing document: " + err);
        });
    }
  }
};
</script>

<style scoped>
.delete-class-dialog {
  border: 4px ridge red;
}
</style>