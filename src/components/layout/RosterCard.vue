<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-expansion-panels inset>
        <v-expansion-panel>
          <v-expansion-panel-header :elevation="hover?12:2">
            <h1 class="student-name">{{firstname}} {{studentId}}</h1>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-card-actions>
                <DeleteStudentDialog :id="id" />
                <v-spacer></v-spacer>
                <UpdateStudentDialog :id="id" />
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-hover>
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