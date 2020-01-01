<template>
  <div>
    <v-expansion-panels inset>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1
            class="student-name"
            v-on:changePreferredName="updatePreferredNameOnDOM($event)"
          >
            {{ preferredName }}
          </h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-actions>
              <DeleteStudentDialog
                :courseRoster="courseRoster"
                :studentId="studentId"
                :preferredName="preferredName"
                :courseId="courseId"
                :index="index"
              />
              <v-spacer></v-spacer>
              <UpdateStudentDialog
                :studentId="studentId"
                :courseId="courseId"
                :index="index"
                :firstName="firstName"
                :lastName="lastName"
                :preferredName="preferredName"
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

  components: {
    UpdateStudentDialog,
    DeleteStudentDialog
  },
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    preferredName: {
      type: String,
      required: true
    },
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
    }
  },

  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped>
.student-name {
  padding: 2%;
}
</style>
