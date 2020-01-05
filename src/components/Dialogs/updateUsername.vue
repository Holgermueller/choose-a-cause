<template>
  <div id="updateUserInfo">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block class="button" color="blue" v-on="on"
          ><span class="mdi mdi-account-edit"></span>
          Update Username
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="card-header">Update Username </v-card-title>
        <v-card-text>
          <p class="title">
            Remember, this name will be displayed on the screen.
          </p>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm12 md13 lg12 xl12>
                <v-text-field
                  type="text"
                  v-model="displayNameForEdit"
                  :placeholder="displayName"
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          <section id="registrationErrors" v-if="errors.length">
            <b>Please fix the following error(s):</b>
            <ul class="errors-list">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </section>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false" color="red" dark
            ><span class="mdi mdi-cancel"></span>Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="green"
            dark
            @click.prevent="updateInfo"
            :loading="loading"
            :disabled="loading"
          >
            <span class="mdi mdi-check"></span> Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateUsernameDialog",
  props: {
    displayName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      errors: [],
      displayNameForEdit: this.displayName
    };
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    updateInfo() {
      this.$store.dispatch("updateUsename", {
        newDisplayName: this.displayNameForEdit
      });
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.card-header {
  background-color: #1e90ff;
}
</style>
