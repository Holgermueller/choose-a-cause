<template>
  <div>
    <v-expansion-panels inset>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1 class="student-name">{{ firstname }}</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-actions>
              <DeleteStudentDialog
                :CourseRoster="CourseRoster"
                :studentId="studentId"
                :CourseId="CourseId"
                :index="index"
              />
              <v-spacer></v-spacer>
              <UpdateStudentDialog
                :studentId="studentId"
                :CourseId="CourseId"
                :index="index"
                :firstname="firstname"
              />
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import UpdateStudentDialog from "../Dialogs/updateStudent";
import DeleteStudentDialog from "../Dialogs/deleteStudent";

export default {
  name: "RosterCard",
  data() {
    return {};
  },
  components: {
    UpdateStudentDialog,
    DeleteStudentDialog
  },
  props: {
    firstname: {
      type: String,
      required: true
    },
    // lastname: {
    //   type: String,
    //   required: true
    // },
    // preferredname: {
    //   type: String,
    //   required: true
    // },
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
  methods: {}
};
</script>

<style scoped>
.student-name {
  padding: 2%;
}
</style>
