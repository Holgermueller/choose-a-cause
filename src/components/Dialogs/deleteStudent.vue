<template>
  <div id="deleteStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red" class="text--white" v-on="on">Delete Student</v-btn>
      </template>

      <v-card>
        <v-card-title>Delete {{ preferredName }}?</v-card-title>
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
            :courseId="courseId"
            class="text--white"
            @click.prevent="deleteStudent(index)"
            >YES</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
    courseRoster: {
      type: Array,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    preferredName: {
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
      this.courseRoster.splice(index, 1);

      this.$store.dispatch("removeStudentFromRoster", {
        studentId: this.studentId,
        courseId: this.courseId
      });
    }
  }
};
</script>
