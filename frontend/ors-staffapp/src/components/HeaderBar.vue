<template>
  <v-card>
    <v-toolbar color="primary" image="../assets/banner2.jpg">
      <v-app-bar-nav-icon @click="setDrawerVisibility()"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ headerBar.title }}
      </v-toolbar-title>
      <v-btn
        :icon="theme.switch ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
      ></v-btn>
      <v-btn icon="mdi-logout" @click="dialog.model = true"></v-btn>
    </v-toolbar>
  </v-card>
  <div>
    <v-dialog
      v-model="dialog.model"
      scrollable
      persistent
      max-width="400px"
      min-width="300px"
      transition="dialog-transition"
    >
      <v-card
        prepend-icon="mdi-comment-question-outline"
        title="Logout"
        text="Are you sure?"
        v-if="!dialog.loading"
      >
        <v-divider color="primary"></v-divider>

        <template #actions>
          <v-spacer></v-spacer>

          <v-btn @click="logout" color="primary"> Yes </v-btn>
          <v-btn @click="dialog.model = false" color="error"> No </v-btn>
        </template>
      </v-card>

      <!--  -->

      <v-list
        v-if="dialog.loading"
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item prepend-icon="mdi-lock" title="Logging Out...">
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>
<script>
import { useAppStore, useCredentialsStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  data: () => ({
    loading: true,

    headerBar: {
      loading: true,
      title: null,
    },

    theme: {
      name: "light",
      switch: true,
    },

    dialog: {
      loading: false,
      model: false,
      res: null,
    },
  }),

  computed: {
    ...mapStores(useAppStore),
  },

  watch: {
    "appStore.headerBar.title"(newValue) {
      this.headerBar.title = newValue;
      console.log("Header Bar | Watcher | New Title: ", newValue);
    },
  },

  methods: {
    async setDrawerVisibility() {
      const appStore = useAppStore();
      const oldVal = JSON.parse(appStore.navigatorBar.drawer);
      const newVal = !oldVal;
      console.log("Header Bar | setDrawerVisibility | Old Value: ", oldVal);
      appStore.setNavigatorBarDrawer(newVal);
    },

    toggleTheme() {
      const appStore = useAppStore();
      const currentTheme = appStore.theme;

      if (currentTheme === "light") {
        appStore.toggleTheme("dark");

        this.theme.switch = false;
      } else {
        appStore.toggleTheme("light");
        this.theme.switch = true;
      }
    },

    async logout() {
      const credStore = useCredentialsStore();

      this.dialog.loading = true;
      setTimeout(() => {
        this.dialog.loading = false;
        this.dialog.model = false;
        credStore.logout();
        this.$router.push({
          name: "LoginPage",
        });
      }, 2000);
    },
  },
};
</script>
