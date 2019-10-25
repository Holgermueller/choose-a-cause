<template>
  <div>
    <v-hover id="id" v-slot:default="{hover}">
      <v-expansion-panels inset>
        <v-expansion-panel>
          <v-expansion-panel-header :elevation="hover?12:2">
            <h1 class="student-name">{{firstname}}</h1>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-card-actions>
                <v-btn color="red">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-hover>
  </div>
</template>

<script>
import { type } from "os";
export default {
  data() {
    return {};
  },
  props: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    preferredname: {
      type: String,
      required: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.student-name {
  padding: 2%;
}
</style>