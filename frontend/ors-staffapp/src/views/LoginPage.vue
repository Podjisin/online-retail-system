<template>
  <v-app :theme="theme">
    <div>
      <v-sheet class="pa-10" color="secondary" height="100vh" rounded>
        <!-- <v-img
        alt="Vue.js logo"
        class="mx-auto mb-10"
        contain
        height="64"
        src="../assets/logo.png"
        width="64"
      >
      </v-img>
      <h1 class="text-center text-white">Online Retail System</h1>
      <p class="text-center text-white">Admin Application</p> -->

        <v-container grid-list-xs>
          <v-row>
            <v-col>
              <v-img
                alt="Vue.js logo"
                class="mx-auto mb-10"
                contain
                height="64"
                src="../assets/logo.png"
                width="64"
              >
              </v-img>
              <h1 class="text-center text-white">
                Online Retail / Ordering System
              </h1>
              <p class="text-center text-white">Admin Application</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card class="mx-auto" max-width="400">
                <v-form
                  ref="form"
                  v-model="form.model"
                  @submit.prevent="onsubmit"
                >
                  <v-container grid-list-xs dense>
                    <v-row no-gutters>
                      <v-col>
                        <v-text-field
                          v-model="form.username"
                          class="mb-3"
                          label="Username"
                          :rules="[rules.required]"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col>
                        <v-text-field
                          v-model="form.password"
                          class="mb-3"
                          label="Password"
                          :rules="[rules.required]"
                          :type="form.showPassword ? 'text' : 'password'"
                          :append-inner-icon="
                            form.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append-inner="
                            form.showPassword = !form.showPassword
                          "
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col>
                        <v-btn
                          block
                          :loading="loading"
                          :disabled="!form.model"
                          color="success"
                          size="large"
                          type="submit"
                          variant="elevated"
                        >
                          Sign In
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
          <v-row> </v-row>
        </v-container>
      </v-sheet>
    </div>
    <!-- <div>
      <SnackBar
        ref="SnackBar"
        :snackbarTitle="snackbar.title"
        :snackbarText="snackbar.text"
        :color="snackbar.color"
      >
      </SnackBar>
    </div> -->

    <VSonner :duration="toast.duration" :visible-toasts="toast.visible">
    </VSonner>
    <FooterBar></FooterBar>
  </v-app>
</template>

<script>
import { VSonner, toast } from "vuetify-sonner";

// import SnackBar from "@/components/SnackBar.vue";
import FooterBar from "@/layouts/default/FooterBar.vue";

import { useAppStore, useCredentialsStore } from "@/store/app";
import { useTheme } from "vuetify/lib/framework.mjs";
export default {
  data: () => ({
    snackbar: {
      title: "",
      text: "",
      color: "info",
    },

    loading: false,

    theme: "light",

    toast: {
      duration: 2000,
      visible: 5,
    },

    form: {
      model: false,
      username: null,
      password: null,
      showPassword: false,
    },
    rules: {
      required: (value) => !!value || "Field is required!",
    },
  }),
  components: {
    // SnackBar,
    VSonner,
    FooterBar,
  },

  watch: {
    "appStore.theme.default"(newValue) {
      this.theme = newValue;
      // console.log("Theme Changed:", newValue);
    },
  },

  methods: {
    onsubmit() {
      if (!this.form.model) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.login();
      }, 2000);
    },

    async login() {
      try {
        // console.log("Logging in");
        const credentials = useCredentialsStore();
        await credentials.login(this.form.username, this.form.password);
        const loginState = credentials.isLoggedIn;
        // console.log(loginState);
        if (loginState) {
          this.loading = false;
          this.form.model = false;
          toast("Sucess", {
            description: `Logging in`,
            prependIcon: "mdi-check-circle-outline",
            cardProps: {
              color: "success",
            },
          });
          this.resetFields();

          await this.$router.push({
            name: "DashboardPage",
          });

          const appStore = useAppStore();
          appStore.setHeaderBarTitle("Dashboard");
        } else {
          toast("Error", {
            description: `Failed to login`,
            prependIcon: "mdi-alert-circle-outline",
            cardProps: {
              color: "error",
            },
          });
        }
      } catch (err) {
        console.log(err);
        toast("Error", {
          description: err,
          prependIcon: "mdi-alert-circle-outline",
          cardProps: {
            color: "error",
          },
        });
      }
    },

    toggleTheme() {
      const appStore = useAppStore();
      const theme = useTheme();
      theme.global.name.value = appStore.theme;
      // console.log(theme.global.name.value);
    },

    async resetFields() {
      this.form.username = "";
      this.form.password = "";
    },
  },

  created() {
    const appStore = useAppStore();
    this.theme = appStore.theme.default;
  },
};
</script>
