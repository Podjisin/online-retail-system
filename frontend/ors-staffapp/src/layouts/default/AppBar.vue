<template>
  <div>
    <v-app-bar color="primary" image="../../assets/banner2.jpg" prominent>
      <!-- <template #image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template> -->
      <template #prepend>
        <v-app-bar-nav-icon @click="setDrawerVisibility()"></v-app-bar-nav-icon>
      </template>
      <template #append>
        <v-tooltip text="Toggle Dark Mode" location="bottom">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :icon="theme.switch ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Logout" location="bottom">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-logout"
              @click="dialog.model = true"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-app-bar>
  </div>

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
    /**
     * Toggles the drawer visibility state in the app store.
     * Gets the current drawer visibility state, inverts it,
     * logs the old state, and updates the app store with the new state.
     */
    async setDrawerVisibility() {
      const appStore = useAppStore();
      const oldVal = JSON.parse(appStore.navigatorBar.drawer);
      const newVal = !oldVal;
      console.log("Header Bar | setDrawerVisibility | Old Value: ", oldVal);
      appStore.setNavigatorBarDrawer(newVal);
    },

    /**
     * Toggles the theme between light and dark by updating the
     * theme in the app store. Gets the current theme from the app store,
     * checks if it is light or dark, toggles it to the opposite, updates
     * the app store with the new theme, and updates the local theme switch
     * variable accordingly.
     */
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

    /**
     * Logs the user out by:
     * 1. Setting the loading dialog to true
     * 2. Waiting 2 seconds
     * 3. Setting the loading dialog to false
     * 4. Closing the dialog model
     * 5. Calling the logout() method from the credentials store
     * 6. Navigating to the login page
     */
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
