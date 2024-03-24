<template>
  <v-card min-width="100px" :color="color" elevation="2">
    <template #image>
      <v-img class="gradient-background"></v-img>
    </template>
    <v-card-item>
      <v-card-title class="text-center text-uppercase">{{
        title
      }}</v-card-title>

      <v-card-subtitle v-if="subtitle" class="text-center">
        <span class="me-1">{{ subtitle }}</span>
      </v-card-subtitle>
      <template #prepend></template>
    </v-card-item>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "secondary",
    },
  },

  data: () => ({
    model: false,
  }),
};
</script>

<style scoped>
.gradient-background {
  /* Add the gradient background style here */
  background: linear-gradient(
      to top right,
      rgba(19, 84, 122, 0.8),
      rgba(128, 208, 199, 0.8)
    ),
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.6) 100%
    );
  /* Add any other styles you need */
  width: 100%;
  height: 100vh; /* Adjust the height as needed */
}
</style>
