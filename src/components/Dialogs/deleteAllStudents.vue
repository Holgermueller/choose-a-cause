<template>
  <div data-app id="deleteAllStudents">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block class="button" color="red" dark v-on="on">
          <span></span>Delete All Students
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Delete All Students</v-card-title>
        <v-card-text>
          <h2 class="title">
            Are you sure you want to delete all of the students?
          </h2>
          <h2 class="title">This action cannot be reversed</h2>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">
            <span class="mdi mdi-cancel">Cancel</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="deleteAll">
            <span class="mdi mdi-check-bold"></span>Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteAllStudents",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteAll() {
      console.log("click");
    }
  }
};
</script>

<style scoped>
.headline {
  background-color: red;
}
</style>
