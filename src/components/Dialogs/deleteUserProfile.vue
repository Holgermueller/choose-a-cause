<template>
  <div id="deleteUser">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block color="red" dark class="text--white" v-on="on">
          <span class="mdi mdi-trash-can-outline"></span>Delete Profile
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="card-header">
          Delete account, Professor {{ displayName }}?
        </v-card-title>

        <v-card-text>
          <p class="title">Are you certain you want to delete your account?</p>
          <p class="title">This action cannot be reversed.</p>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" dark @click="dialog = false"
              ><span class="mdi mdi-cancel"></span> Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="green" @click.prevent="deleteAccount"
              ><span class="mdi mdi-check"></span> Delete</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteAccountDialog",
  props: {
    displayName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteAccount() {
      console.log("click");
    }
  }
};
</script>

<style scoped>
.card-header {
  background-color: red;
  color: white;
}
</style>
