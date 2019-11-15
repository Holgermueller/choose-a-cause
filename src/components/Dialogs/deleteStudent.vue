<template>
  <div id="deleteStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red" class="text--white" v-on="on">Delete Student</v-btn>
      </template>

      <v-card>
        <v-card-title>Delete Student Name</v-card-title>
        <v-card-text>
          <p>Are you certain you want to delete this student?</p>
          <p>This action cannot be reversed.</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" class="text--white" @click="dialog = false"
            >NO</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :id="studentId"
            class="text--white"
            @click="deleteStudent(index)"
            >YES</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "DeleteStudentDialog",
  props: {
    studentId: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    CourseRoster: {
      type: Array,
      required: true
    },
    CourseId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteStudent(index) {
      this.CourseRoster.splice(index, 1);
      console.log(index);

      let targetId = event.currentTarget.id;
      db.collection("courses")
        .doc(this.CourseId)
        .collection("roster")
        .doc(targetId)
        .delete()
        .then(() => {
          console.log("Student deleted");
          this.dialog = false;
        })
        .catch(err => {
          console.error("Error removing document: " + err);
        });
    }
  }
};
</script>
