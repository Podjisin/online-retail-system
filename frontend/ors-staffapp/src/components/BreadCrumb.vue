<template>
  <v-breadcrumbs :items="items">
    <template v-slot:title="{ item }">
      {{ item.title }}
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  data: () => ({
    items: [],
  }),

  watch: {
    $router() {
      this.updateBreadcrumbs();
    },
  },
  methods: {
    updateBreadcrumbs() {
      console.log("Current route:", this.$route);
      const matchedRoutes = this.$route.matched.filter(
        (route) => route.meta && route.meta.breadcrumb
      );
      console.log("Matched routes:", matchedRoutes);
      this.items = matchedRoutes.map((route) => {
        return {
          title: route.meta.breadcrumb,
          disabled: route === this.$route || route.meta.disabled,
          to: route.path,
        };
      });

      console.log("items:", this.items);
    },
  },

  created() {
    this.updateBreadcrumbs();
  },
};
</script>
