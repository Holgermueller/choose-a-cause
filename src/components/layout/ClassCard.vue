<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-card :elevation="hover?12:2">
        <h1 class="course-name">{{CourseName}}</h1>
        <v-card-actions>
          <DeleteCourse :id="id" :CourseName="CourseName" :index="index" :classList="classList" />
          <v-spacer></v-spacer>

          <router-link :to="{name: 'singleClass', params: {CourseName: CourseName, id:id}}">
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
  name: "ClassCard",
  components: { DeleteCourse },
  data() {
    return {};
  },
  props: {
    CourseName: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    classList: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToRoster() {
      let targetId = event.currentTarget.id;
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