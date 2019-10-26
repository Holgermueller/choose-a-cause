<template>
    <div id="login">
        <v-form ref="form">
            <v-text-field v-model="usernameOrEmail" label="Username or Email"></v-text-field>
            <v-text-field v-model="password" label="Password"></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn>Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn>Submit</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
    data(){
        return{
            usernameOrEmail: null,
            password: null
        }
    }
}
</script>