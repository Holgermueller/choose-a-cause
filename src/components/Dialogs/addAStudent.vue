<template>
  <div id="addStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn block class="button" color="green" dark v-on="on">Add a student</v-btn>
      </template>

      <v-card class="add-student-dialog">
        <v-card-title>Add a student:</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field type="text" v-model="firstName" label="First name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field type="text" v-model="last_name" label="Last name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md13 lg12 xl12>
                  <v-text-field type="text" v-model="preferred_name" label="Preferred name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" :id="id" @click="submitStudent">Submit</v-btn>
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
    id: {
      type: String,
      required: true
    },
    classRoster: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      firstName: null,
      last_name: null,
      preferred_name: null
    };
  },
  methods: {
    submitStudent() {
      let firstName = this.firstName;
      let lastname = this.last_name;
      let preferredname = this.preferred_name;
      console.log(firstName);

      db.collection("courses")
        .doc(this.id)
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
      let classRoster = this.classRoster;

      classRoster.length = 0;

      db.collection("courses")
        .doc(this.id)
        .collection("roster")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = {
              studentId: doc.id,
              firstName: doc.data().firstname
            };
            this.classRoster.push(data);
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