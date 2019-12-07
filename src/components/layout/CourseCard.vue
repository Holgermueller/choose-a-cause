<template>
  <div>
    <v-hover id="CourseId" v-slot:default="{ hover }">
      <v-card :elevation="hover ? 12 : 2">
        <!-- <v-progress-linear
          height="11"
          indeterminate
          rounded
          :loading="loading"
          :disabled="loading"
        ></v-progress-linear> -->
        <h1 class="course-name">{{ courseName }}</h1>
        <v-card-actions>
          <DeleteCourse
            :courseId="courseId"
            :courseName="courseName"
            :index="index"
            :courseList="courseList"
          />
          <v-spacer></v-spacer>

          <router-link
            :to="{
              name: 'SingleCourse',
              params: { courseName: courseName, courseId: courseId }
            }"
          >
            <v-btn color="primary" @click="goToRoster">
              <span class="mdi mdi-account-group"></span> See roster
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import DeleteCourse from "../Dialogs/deleteCourse";

export default {
  name: "CourseCard",
  components: { DeleteCourse },
  props: {
    courseName: {
      type: String,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    courseList: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    goToRoster() {
      let targetId = event.currentTarget.courseId;
    }
  }
};
</script>

<style scoped>
.course-name {
  margin-left: 4%;
  padding: 2%;
}
a {
  text-decoration: none;
}
</style>
