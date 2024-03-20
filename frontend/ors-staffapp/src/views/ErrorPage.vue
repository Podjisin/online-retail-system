<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="error-card">
          <v-card-title class="text-center">Oops! Page Not Found</v-card-title>
          <v-card-text class="text-center">
            <p>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <p>
              Please check the URL for any mistakes or try navigating back to
              the homepage.
            </p>
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn color="primary" to="/">Go to Homepage</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage404",
};
</script>

<style scoped>
.error-card {
  background-color: #f44336; /* Red color for error */
  color: white; /* White text for contrast */
}
</style>
