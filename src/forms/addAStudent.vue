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
                  <v-text-field type="text" v-model="first_name" label="First name"></v-text-field>
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
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="submitStudent">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../components/firebase/firebaseInit";

export default {
  data() {
    return {
      dialog: false,
      first_name: null,
      last_name: null,
      preferred_name: null
    };
  },
  methods: {
    submitStudent() {
      let firstname = this.first_name;
      let lastname = this.last_name;
      let preferredname = this.preferred_name;

    //   db.collection("courses")
    //     .doc(this.id)
    //     .collection("roster")
    //     .add({ firstname: firstname });

      this.dialog = false;
      this.clearForm();
    },
    clearForm() {
      this.$refs.form.reset();
    },
    updateRoster() {}
  }
};
</script>

<style scoped>
</style>