<template>
  <v-card>
    <v-navigation-drawer v-model="navBar.drawer" temporary>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Jhon Doe"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              size="small"
              variant="text"
              @click="setDrawerVisibility()"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navBar.items"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          @click="navItemClick(item)"
          color="secondary"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";
export default {
  data: () => ({
    loading: true,

    navBar: {
      drawer: null,
      items: [],
    },
  }),

  computed: {
    ...mapStores(useAppStore),
  },

  watch: {
    "appStore.navigatorBar.drawer": {
      immediate: true,
      handler(value) {
        if (value === true) {
          this.navBar.drawer = true;
        } else {
          this.navBar.drawer = false;
        }
      },
    },
  },

  methods: {
    async setDrawerVisibility() {
      const appStore = useAppStore();
      const value = !this.navBar.drawer;
      appStore.setNavigatorBarDrawer(value);
    },

    navItemClick(item) {
      item.onClick;
      this.$emit("nav-item-click");
      const appStore = useAppStore();
      appStore.navigatorBar.drawer = false;
    },
  },

  created() {
    this.navBar.drawer = false;
    this.navBar.items = useAppStore().navigatorBar.items;
  },
};
</script>
<style></style>
