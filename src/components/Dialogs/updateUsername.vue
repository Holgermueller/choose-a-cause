<template>
  <div id="updateUserInfo">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="blue" v-on="on">
          Update Username
        </v-btn>
      </template>

      <v-card>
        <v-card-title>Update Username </v-card-title>
        <v-card-text>
          <p>Remember, this name will be displayed on the screen.</p>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm12 md13 lg12 xl12>
                <v-text-field
                  type="text"
                  v-model="getUserName"
                  :value="getUserName"
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
          <v-btn @click="dialog = false"
            ><span class="mdi mdi-close"></span>Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="updateInfo" :loading="loading" :disabled="loading">
            <span class="mdi mdi-check"></span> Submit</v-btn
          >
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
      errors: []
    };
  },

  computed: {
    getUserName: {
      get() {
        return this.$store.getters.user.username;
      },
      set(value) {
        this.$store.commit("updateUsername", value);
      }
    },

    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    }
  },

  methods: {
    updateInfo() {
      if (!this.getUserName) {
        this.errors.push("Please provide new username.");
      }
    }
  }
};
</script>

<style scoped></style>
