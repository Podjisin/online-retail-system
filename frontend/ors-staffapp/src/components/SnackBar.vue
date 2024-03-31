<template>
  <div class="text-center">
    <v-snackbar :model-value="model" :timeout="timeout" :color="color">
      <div>{{ title }}</div>

      <template #actions>
        <v-btn color="white" block text @click="value = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "info",
    },
    timeout: {
      type: Number,
      default: 6000,
    },
  },
};
</script>
