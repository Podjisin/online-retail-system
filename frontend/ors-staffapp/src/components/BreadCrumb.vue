<template>
  <v-breadcrumbs :items="items">
    <template v-slot:title="{ item }">
      {{ item.title }}
    </template>
  </v-breadcrumbs>
  <v-divider thickness="2" color="secondary"> </v-divider>
</template>

<script>
export default {
  data: () => ({
    items: [],
  }),

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateBreadcrumbs();
      },
    },
  },
  methods: {
    /**
     * Updates the breadcrumb navigation based on the current route.
     * Gets the matched routes that have a breadcrumb meta field, maps them to breadcrumb items,
     * and updates the component's items data.
     */
    updateBreadcrumbs() {
      // console.log("Current route:", this.$route);
      const matchedRoutes = this.$route.matched.filter(
        (route) => route.meta && route.meta.breadcrumb
      );
      //   console.log("Matched routes:", matchedRoutes);
      this.items = matchedRoutes.map((route) => {
        return {
          title: route.meta.breadcrumb,
          disabled: route === this.$route || route.meta.disabled,
          to: route.path,
        };
      });

      //   console.log("items:", this.items);
    },
  },

  created() {
    this.updateBreadcrumbs();
  },
};
</script>
