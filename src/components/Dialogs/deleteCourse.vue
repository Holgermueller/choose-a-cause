<template>
  <div id="deleteCourseDialog">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red" v-on="on">
          <span class="mdi mdi-trash-can-outline"></span>Delete
        </v-btn>
      </template>

      <v-card class="delete-class-dialog">
        <v-card-title class="red">Delete {{ courseName }}?</v-card-title>
        <v-card-text>
          <p>Are you certain you want to delete this course?</p>
          <p>This action cannot be reversed.</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false" class="text--white">
            <span class="mdi mdi-cancel"></span> cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteCourse(index)">
            <span class="mdi mdi-check-bold"></span> Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteCourse",
  props: {
    courseId: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    courseList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },

  methods: {
    deleteCourse(index) {
      this.courseList.splice(index, 1);

      this.$store.dispatch("deleteCourse", {
        courseId: this.courseId
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
