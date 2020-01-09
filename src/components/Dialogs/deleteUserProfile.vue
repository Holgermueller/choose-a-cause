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

          <v-layout row v-if="error">
            <app-alert
              @dismissed="onDismissed"
              :text="error.message"
            ></app-alert>
          </v-layout>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" dark @click="dialog = false"
              ><span class="mdi mdi-cancel"></span> Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="green"
              class="delete-button"
              @click.prevent="bothActions"
              :loading="loading"
              :disabled="loading"
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

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    deleteAccount() {
      return this.$store.dispatch("deleteAccount");
    },

    goToAccountDeletedPage() {
      this.$router.push({
        name: "AccounteDeleted",
        query: {
          redirect: "/accounteDeleted"
        }
      });
    },

    bothActions() {
      this.deleteAccount();
      this.goToAccountDeletedPage();
    },

    onDismissed() {
      this.$store.displayName("clearError");
    }
  }
};
</script>

<style scoped>
.card-header {
  background-color: red;
  color: white;
}
a {
  text-decoration: none;
  color: white;
}
.delete-button {
  color: white;
}
</style>
