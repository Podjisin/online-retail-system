<template>
  <v-app v-if="this.isLoggedIn" class="bg-secondary" :theme>
    <div>
      <v-container fluid>
        <v-row>
          <v-col>
            <AppBar> </AppBar>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <BreadCrumb> </BreadCrumb>
            <v-main class="pa-2">
              <router-view></router-view>
            </v-main>
          </v-col>
        </v-row>
      </v-container>

      <!-- <FooterBar></FooterBar> -->
    </div>

    <div>
      <NavBar></NavBar>
    </div>

    <div>
      <!-- <SnackBar
        ref="SnackBar"
        :snackbarTitle="snackbar.title"
        :snackbarText="snackbar.text"
        :color="snackbar.color"
      >
      </SnackBar> -->
    </div>
    <v-snackbar v-model="snackbar.model" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>

    <VSonner
      closeButton
      :position="toast.position"
      :duration="toast.duration"
      :visible-toasts="toast.visible"
    >
    </VSonner>
  </v-app>
</template>
<script>
// import SnackBar from "@/components/SnackBar.vue";
import AppBar from "@/layouts/default/AppBar.vue";
import NavBar from "@/layouts/default/NavBar.vue";
// import FooterBar from "@/layouts/default/FooterBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";

import { VSonner } from "vuetify-sonner";
import { useAppStore, useCredentialsStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  data: () => ({
    snackbar: {
      model: false,
      text: "",
      color: "info",
    },

    toast: {
      duration: 2000,
      visible: 5,
      position: "bottom-right",
    },

    isLoggedIn: false,
    loading: false,
    theme: "light",
  }),

  components: {
    AppBar,
    NavBar,
    VSonner,
    BreadCrumb,
  },

  computed: {
    ...mapStores(useAppStore),
  },

  watch: {
    "appStore.theme.default"(newValue) {
      this.theme = newValue;
      console.log("Theme Changed:", newValue);
    },

    "appStore.notifications.model"(newValue) {
      this.snackbar.model = newValue;
      this.snackbar.text = this.appStore.notifications.text;
      this.snackbar.color = this.appStore.notifications.color;
      console.log("Notification: ", this.snackbar);
    },
  },

  created() {
    this.loading = true;
    console.log("Loading...");
    const credStore = useCredentialsStore();
    const LogInState = credStore.isLoggedIn;

    const appStore = useAppStore();
    this.theme = appStore.theme.default;

    const val = JSON.parse(appStore.navigatorBar.drawer);
    console.log("Drawer Value: ", val);

    if (LogInState) {
      this.loading = false;
      this.isLoggedIn = true;
      console.log("Logged In");
    } else {
      console.log("Not Logged In");
      this.$router.push({
        name: "LoginPage",
      });
    }
  },
};
</script>
