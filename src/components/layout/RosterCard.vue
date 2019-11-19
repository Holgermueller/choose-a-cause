<template>
  <div>
    <v-expansion-panels inset>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1
            class="student-name"
            v-on:changePreferredName="grabUpdatedStudentInfo($event)"
          >
            {{ preferred_name_for_display }}
          </h1>
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
import { bus } from "../../main";

export default {
  name: "RosterCard",
  data() {
    return {
      preferred_name_for_display: this.preferredName
    };
  },
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
    CourseRoster: {
      type: Array,
      required: true
    },
    CourseId: {
      type: String,
      required: true
    }
  },
  // created() {
  //   bus.$on("changePreferredName", data => {
  //     this.preferred_name_for_display = data;
  //   });
  // },
  methods: {
    grabUpdatedStudentInfo(updatedPreferredName) {
      this.preferred_name_for_display = updatedPreferredName;
      console.log("click");
    }
  }
};
</script>

<style scoped>
.student-name {
  padding: 2%;
}
</style>
