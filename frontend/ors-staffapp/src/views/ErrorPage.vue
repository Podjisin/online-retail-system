<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Oops! Page Not Found</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-center">
            <v-icon color="error" size="200">mdi-alert-circle-outline</v-icon>
            <h1>404</h1>
            <br />
            <p>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <p>
              Please check the URL for any mistakes or try navigating back to
              the homepage.
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click="goBack()" block>Go Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage404",
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
