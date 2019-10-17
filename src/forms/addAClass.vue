<template>
  <div data-app id="addClassForm">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn block color="green" dark v-on="on">Add A Class</v-btn>
      </template>

      <v-card>
        <v-card-title>Add a class:</v-card-title>
        <v-card-text>
          <v-text-field></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      errors: [],
      class_name: null
    };
  }
};
</script>

<style scoped>
</style>