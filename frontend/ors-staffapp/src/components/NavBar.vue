<template>
  <div>
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
                @click="setDrawerVisibility(false)"
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
            @click="item.onClick"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
import { useAppStore } from "@/store/app";
export default {
  data: () => ({
    loading: true,

    navBar: {
      drawer: null,
      items: [],
    },
  }),

  computed: {
    drawerState() {
      const state = useAppStore().navigatorBar.drawer;
      return state;
    },
  },

  watch: {
    drawerState(value) {
      this.navBar.drawer = value;
    },
  },

  methods: {
    async setDrawerVisibility(value) {
      const appStore = useAppStore();
      appStore.setNavigatorBarDrawer(value);
    },
  },

  created() {
    this.navBar.drawer = useAppStore().navigatorBar.drawer;
    this.navBar.items = useAppStore().navigatorBar.items;
  },
};
</script>
<style></style>
