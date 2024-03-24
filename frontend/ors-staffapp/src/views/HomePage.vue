<template>
  <v-app v-if="this.isLoggedIn" :theme="this.theme">
    <div>
      <v-container>
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
    </div>

    <div>
      <NavBar></NavBar>
    </div>

    <div>
      <SnackBar
        ref="SnackBar"
        :snackbarTitle="snackbar.title"
        :snackbarText="snackbar.text"
        :color="snackbar.color"
      >
      </SnackBar>
    </div>
  </v-app>
</template>
<script>
import SnackBar from "@/components/SnackBar.vue";
import AppBar from "@/layouts/default/AppBar.vue";
import NavBar from "@/layouts/default/NavBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useAppStore, useCredentialsStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  data: () => ({
    snackbar: {
      title: "",
      text: "",
      color: "info",
    },

    isLoggedIn: false,
    loading: false,
    theme: "light",
  }),
  components: {
    SnackBar,
    AppBar,
    NavBar,
    BreadCrumb,
  },

  computed: {
    ...mapStores(useAppStore),
  },

  watch: {
    "appStore.theme"(newValue) {
      this.theme = newValue;
      console.log("Theme Changed:", newValue);
    },
  },

  created() {
    this.loading = true;
    console.log("Loading...");
    const credStore = useCredentialsStore();
    const LogInState = credStore.isLoggedIn;

    const appStore = useAppStore();
    this.theme = appStore.theme;

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
