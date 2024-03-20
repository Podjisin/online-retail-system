<template>
  <v-app v-if="!loading">
    <v-container>
      <v-row>
        <v-col>
          <HeaderBar></HeaderBar>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <NavBar></NavBar>
          <v-main>
            <BreadCrumb> </BreadCrumb>
            <router-view></router-view>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
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
import HeaderBar from "@/components/HeaderBar.vue";
import NavBar from "@/components/NavBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useCredentialsStore } from "@/store/app";
// import { useCredentialsStore } from "@/store/app";

export default {
  data: () => ({
    snackbar: {
      title: "",
      text: "",
      color: "info",
    },

    loading: false,
  }),
  components: {
    SnackBar,
    HeaderBar,
    NavBar,
    BreadCrumb,
  },

  created() {
    this.loading = true;
    const credStore = useCredentialsStore();
    const LogInState = credStore.isLoggedIn;

    if (LogInState) {
      this.loading = false;
    } else {
      this.$router.push({
        name: "LoginPage",
      });
    }
  },
};
</script>
