<template>
  <div id="updateStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="primary" class="text--white" v-on="on">Update Student Info</v-btn>
      </template>

      <v-card>
        <v-card-title>Update Name goes here</v-card-title>
        <v-card-text>Form goes here</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" class="text--white" @click="dialog = false">cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="updateStudentInfo()">update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name:"UpdateStudentDialog",
  date() {
    return {
      dialog: false
    };
  },
  methods: {
    updateStudentInfo() {
      console.log("click")
    }
  }
};
</script>

<style scoped>
</style>