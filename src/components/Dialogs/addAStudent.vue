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

          <section id="rosterSubmissionErrors" v-if="errors.length">
            <b>Please fix the following error(s):</b>
            <ul class="errors-list">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </section>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">
            <span class="mdi mdi-cancel"></span> Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" :courseId="courseId" @click.prevent="formIsValid">
            <span class="mdi mdi-check-bold"></span> Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddStudentDialog",
  props: {
    courseId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      firstName: null,
      lastName: null,
      preferredName: null,
      errors: []
    };
  },

  methods: {
    formIsValid() {
      this.errors = [];

      if (!this.firstName && !this.lastName && !this.preferredName) {
        this.errors.push("You must fill out all of the fields.");
      } else if (!this.firstName) {
        this.errors.push("You must provide a first name.");
      } else if (!this.lastName) {
        this.errors.push("You must provide a last name.");
      } else if (!this.preferredName) {
        this.errors.push("You must provide a preferred name.");
      } else {
        this.submitStudent();
      }
    },

    submitStudent() {
      this.$store.dispatch("addStudentToRoster", {
        firstName: this.firstName,
        lastName: this.lastName,
        preferredName: this.preferredName,
        courseId: this.courseId
      });

      this.clearForm();
      this.dialog = false;
    },

    clearForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.add-student-dialog {
  border: 3px ridge lightskyblue;
}
#rosterSubmissionErrors {
  margin: 2% 0;
  color: red;
  text-align: center;
}
.errors-list {
  list-style: none;
}
</style>
