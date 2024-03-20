<!-- filename: LoginPage.vue -->

<template>
  <div>
    <v-sheet class="pa-10" color="secondary" height="100vh" rounded>
      <v-img
        alt="Vue.js logo"
        class="mx-auto mb-10"
        contain
        height="64"
        src="../assets/logo.png"
        width="64"
      >
      </v-img>
      <h1 class="text-center text-white">Online Retail System</h1>
      <p class="text-center text-white">Admin Application</p>

      <v-container grid-list-xs>
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
  <div>
    <SnackBar
      ref="SnackBar"
      :snackbarTitle="snackbar.title"
      :snackbarText="snackbar.text"
      :color="snackbar.color"
    >
    </SnackBar>
  </div>
</template>

<script>
import SnackBar from "@/components/SnackBar.vue";
import { useAppStore, useCredentialsStore } from "@/store/app";
export default {
  data: () => ({
    snackbar: {
      title: "",
      text: "",
      color: "info",
    },

    loading: false,

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
    SnackBar,
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
        console.log("Logging in");
        const credentials = useCredentialsStore();
        await credentials.login(this.form.username, this.form.password);
        const loginState = credentials.isLoggedIn;
        console.log(loginState);
        if (loginState) {
          this.loading = false;
          this.form.model = false;
          this.snackbar.title = "Login Successful";
          this.snackbar.text = "Redirecting...";
          this.snackbar.color = "success";
          this.$refs.SnackBar.value = true;
          this.resetFields();

          await this.$router.push({
            name: "DashboardPage",
          });

          const appStore = useAppStore();
          appStore.setHeaderBarTitle("Dashboard");
        } else {
          this.loading = false;
          this.snackbar.title = "Login Failed";
          this.snackbar.text = "Incorrect Username or Password";
          this.snackbar.color = "error";
          this.$refs.SnackBar.value = true;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async resetFields() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>
