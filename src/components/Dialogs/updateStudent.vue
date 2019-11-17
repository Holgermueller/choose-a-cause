<template>
  <div id="updateStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="text--white" v-on="on"
          >Update Student Info</v-btn
        >
      </template>

      <v-card>
        <v-card-title>Update info for {{ preferredName }}:</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="first_name_edit"
                    :placeholder="firstName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="last_name_edit"
                    :placeholder="lastName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="preferred_name_edit"
                    :placeholder="preferredName"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" class="text--white" @click="dialog = false"
            >cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn :id="studentId" @click="updateStudentInfo">update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "UpdateStudentDialog",
  data() {
    return {
      dialog: false,
      first_name_edit: this.firstName,
      last_name_edit: this.lastName,
      preferred_name_edit: this.preferredName
    };
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
    CourseId: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: true
    }
  },
  methods: {
    updateStudentInfo() {
      let newFirstName = this.first_name_edit;
      let newLastName = this.last_name_edit;
      let newPreferredName = this.preferred_name_edit;
      let targetId = event.currentTarget.id;

      db.collection("courses")
        .doc(this.CourseId)
        .collection("roster")
        .doc(targetId)
        .update({
          firstname: newFirstName,
          lastname: newLastName,
          preferredname: newPreferredName
        })
        .then(() => {
          console.log("Student info updated successfully!");
          this.$router.go();
          this.dialog = false;
        })
        .catch(err => {
          console.log("An error has occurred: " + err);
        });
    }
  }
};
</script>

<style scoped></style>
