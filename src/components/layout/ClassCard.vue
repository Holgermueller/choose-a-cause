<template>
    <div>
        <v-hover>
            <v-card>
                <h1>Class name goes here.</h1>
            </v-card>
        </v-hover>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        ClassName: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>