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
                    v-model="firstNameForEdit"
                    :placeholder="firstName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="lastNameForEdit"
                    :placeholder="lastName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-text-field
                    type="text"
                    v-model="preferredNameForEdit"
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
          <v-btn :id="studentId" @click.prevent="updateStudentInfo"
            >update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateStudentDialog",
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
    courseId: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      firstNameForEdit: this.firstName,
      lastNameForEdit: this.lastName,
      preferredNameForEdit: this.preferredName
    };
  },

  methods: {
    updateStudentInfo() {
      this.store.dispatch("updateStudentInfo", {
        newFirstName: this.firstNameForEdit,
        newLastName: this.lastNameForEdit,
        newPreferredName: this.preferredNameForEdit
      });

      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
