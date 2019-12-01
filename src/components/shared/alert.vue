<template>
  <div>
    <v-alert type="error" dark dismissible tile @input="onClose">
      alert!!
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    };
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style scoped></style>
