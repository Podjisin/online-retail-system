<template>
  <v-card elevation="2">
    <v-form>
      <v-container>
        <v-row>
          <v-col> <h2>Account</h2> </v-col>
          <v-divider></v-divider>
          <br />
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.username"
              label="Username"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.password"
              label="Password"
              prepend-icon="mdi-key"
              :type="profile.showPassword ? 'text' : 'password'"
              :append-inner-icon="
                profile.showPassword ? 'mdi-eye-off' : 'mdi-eye'
              "
              @click:append-inner="profile.showPassword = !profile.showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" prepend-icon="mdi-content-save" block>
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCredentialsStore } from "@/store/app";

export default {
  data: () => ({
    profile: {
      showPassword: false,

      username: "",
      password: "",
    },
  }),

  created() {
    const credStore = useCredentialsStore();
    this.profile.username = credStore.username;
    this.profile.password = credStore.password;
  },
};
</script>
