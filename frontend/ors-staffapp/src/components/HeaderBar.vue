<template>
  <v-card>
    <v-toolbar
      color="primary"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon
        @click="setDrawerVisibility(true)"
      ></v-app-bar-nav-icon>

      <v-toolbar-title loading>
        {{ headerBar.title }}
      </v-toolbar-title>

      <v-btn prepend-icon="mdi-logout" @click="dialog.model = true"
        >Logout</v-btn
      >
    </v-toolbar>
  </v-card>
  <div>
    <v-dialog
      v-model="dialog.model"
      scrollable
      persistent
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card
        prepend-icon="mdi-comment-question-outline"
        title="Logout"
        text="Are you sure?"
      >
        <v-divider color="primary"></v-divider>

        <template #actions>
          <v-spacer></v-spacer>
          <v-btn @click="logout" color="primary"> Yes </v-btn>
          <v-btn @click="dialog.model = false" color="error"> No </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { useAppStore, useCredentialsStore } from "@/store/app";
export default {
  data: () => ({
    loading: true,
    headerBar: {
      loading: true,
      title: "title",
    },

    dialog: {
      model: false,
      res: null,
    },
  }),

  computed: {
    drawerState() {
      const state = useAppStore().headerBar.title;
      return state;
    },
  },

  watch: {
    drawerState(value) {
      this.headerBar.title = value;
    },
  },

  methods: {
    async setDrawerVisibility(value) {
      const appStore = useAppStore();
      appStore.setNavigatorBarDrawer(value);
      const drawerState = appStore.navigatorBar.drawer;
      console.log(drawerState);
    },

    async logout() {
      const credStore = useCredentialsStore();
      credStore.logout();
      await this.$router.push({
        name: "LoginPage",
      });
    },
  },

  created() {
    const appStore = useAppStore();
    this.headerBar.title = appStore.headerBar.title;
  },
};
</script>
