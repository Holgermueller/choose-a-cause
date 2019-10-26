<template>
  <div data-app id="addClassForm">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn block class="button" color="green" dark v-on="on">Add A Class</v-btn>
      </template>

      <v-card class="add-class-dialog">
        <v-card-title>Add a class:</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout wrap>
              <v-flex xs12 sm12 md13 lg12 xl12>
                <v-text-field
                  type="text"
                  v-model="class_name"
                  label="Enter class name here*"
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
          <v-btn color="red" @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="addClass">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  data() {
    return {
      dialog: false,
      errors: [],
      class_name: null
    };
  },
  props: {
    classList: {
      type: Array,
      required: true
    }
  },
  methods: {
    addClass() {
      let class_name = this.class_name;

      db.collection("courses")
        .add({ courseName: class_name })
        .then(() => {
          console.log("Class addition successful");
        })
        .catch(err => {
          console.log("Error: " + err);
        });
      this.clearField();
      this.dialog = false;
      this.updateClassList();
    },
    updateClassList() {
      let classList = this.classList;

      classList.length = 0;

      db.collection("courses")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              courseName: doc.data().courseName
            };
            this.classList.push(data);
          });
        })
        .catch(err => {
          console.log("Error getting document: " + err);
        });
    },
    clearField() {
      this.$refs.textField.reset();
    }
  }
};
</script>

<style scoped>
.add-class-dialog {
  border: 3px ridge blue;
}
</style>