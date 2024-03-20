<template>
  <div class="text-center">
    <v-snackbar v-model="value" vertical :timeout="timeout" :color="color">
      <div class="text-subtitle-1 pb-2">{{ snackbarTitle }}</div>
      <v-divider :thickness="5"></v-divider>
      <p class="mt-2">
        {{ snackbarText }}
      </p>

      <template #actions>
        <v-btn color="white" block text @click="value = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    snackbarTitle: {
      type: String,
      default: "",
    },
    snackbarText: {
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

  data: () => ({
    value: false,
  }),
};
</script>
