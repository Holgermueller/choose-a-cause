<template>
  <div id="addCourseForm">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block class="button" color="green" dark v-on="on">
          <span class="mdi mdi-plus-thick"></span> Add A Class
        </v-btn>
      </template>

      <v-card class="add-course-dialog">
        <v-card-title class="card-header">Add a class:</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout wrap>
              <v-flex xs12 sm12 md13 lg12 xl12>
                <v-text-field
                  type="text"
                  v-model="newCourseName"
                  label="Enter course name here*"
                  hint="Ex.: Multicultural Lit T-Th 9-9:50"
                  persistent-hint
                  prepend-icon="mdi-account-group"
                  append-icon="mdi-close"
                  ref="textField"
                  @click:append="clearField"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="button" color="red" dark @click="dialog = false">
            <span class="mdi mdi-cancel"></span> Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="button"
            color="green"
            dark
            @click.prevent="addCourse"
            :disabled="!formIsValid"
            ><span class="mdi mdi-check-bold"></span> Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddCourseDialog",

  data() {
    return {
      dialog: false,
      errors: [],
      newCourseName: ""
    };
  },

  computed: {
    formIsValid() {
      return this.newCourseName !== "";
    }
  },

  methods: {
    addCourse() {
      if (!this.formIsValid) {
        return;
      }

      this.$store.dispatch("addNewCourse", {
        newCourseName: this.newCourseName
      });

      this.clearField();
      this.dialog = false;
    },

    clearField() {
      this.$refs.textField.reset();
    }
  }
};
</script>

<style scoped>
.add-course-dialog {
  border: 3px ridge #1e90ff;
}
.card-header {
  background-color: #1e90ff;
}
</style>
