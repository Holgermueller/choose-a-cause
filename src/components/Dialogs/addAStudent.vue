<template>
  <div id="addStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block class="button" color="green" dark v-on="on">
          <span class="mdi mdi-plus-thick"></span> Add a student
        </v-btn>
      </template>

      <v-card class="add-student-dialog">
        <v-card-title>Add a student:</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="firstName"
                    label="First name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="lastName"
                    label="Last name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="preferredName"
                    label="Preferred name"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">
            <span class="mdi mdi-cancel"></span> Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" :CourseId="CourseId" @click="submitStudent">
            <span class="mdi mdi-check-bold"></span> Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "AddStudentDialog",
  props: {
    CourseId: {
      type: String,
      required: true
    },
    CourseRoster: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      firstName: null,
      lastName: null,
      preferredName: null
    };
  },
  methods: {
    submitStudent() {
      let firstName = this.firstName;
      let lastname = this.lastName;
      let preferredname = this.preferredName;

      db.collection("courses")
        .doc(this.CourseId)
        .collection("roster")
        .add({ firstname: firstName })
        .then(() => {
          console.log("Student successfully added!");
        })
        .catch(err => {
          console.log("An error has occurred: " + err);
        });

      this.dialog = false;
      this.clearForm();
      this.updateRoster();
    },

    clearForm() {
      this.$refs.form.reset();
    },

    updateRoster() {
      let CourseRoster = this.CourseRoster;

      CourseRoster.length = 0;

      db.collection("courses")
        .doc(this.CourseId)
        .collection("roster")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = {
              studentId: doc.id,
              firstName: doc.data().firstname,
              lastName: doc.data().lastname,
              preferredName: doc.data().preferredname
            };
            this.CourseRoster.push(data);
          });
        })
        .catch(err => {
          console.log("Error: " + err);
        });
    }
  }
};
</script>

<style scoped>
.add-student-dialog {
  border: 3px ridge lightskyblue;
}
</style>
