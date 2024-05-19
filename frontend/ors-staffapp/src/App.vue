<template>
  <v-app :theme="theme">
    <router-view />
  </v-app>
</template>

<script>
import { useAppStore } from "@/store/app";
export default {
  data: () => ({
    theme: "light",
  }),

  methods: {},
  created() {
    const appStore = useAppStore();
    this.theme = appStore.theme.default;
  },
};
</script>
