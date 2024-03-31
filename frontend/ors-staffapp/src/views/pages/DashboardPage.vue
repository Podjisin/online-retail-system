<template>
  <v-container>
    <v-row>
      <v-col> I dont know what to put here at the moment ¯\_(ツ)_/¯</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card min-height="200px" elevation="3" class="bg-pink-lighten-1">
          <v-card-title> Total Accounts </v-card-title>
          <v-card-subtitle>this month</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-height="200px" elevation="3" class="bg-red-lighten-1">
          <v-card-title> Current Orders </v-card-title>
          <v-card-subtitle>this month</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-height="200px" elevation="3" class="bg-blue-lighten-1">
          <v-card-title> Current Profit </v-card-title>
          <v-card-subtitle>this month</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Inventory Stats</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card min-height="200px" elevation="3" class="bg-red-lighten-1">
          <v-card-title> Needed Restock </v-card-title>

          <v-list lines="one">
            <v-list-item title="Item 1"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Item 2"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Item 3"></v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-height="200px" elevation="3" class="bg-teal-lighten-1">
          <v-card-title> Stable Stock </v-card-title>

          <v-list lines="one">
            <v-list-item title="Item 4"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Item 5"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Item 6"></v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <!-- <v-col>
        <v-card min-height="200px" elevation="3" class="bg-blue-lighten-1">
          <v-card-title> Current Profit </v-card-title>
          <v-card-subtitle>this month</v-card-subtitle>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [],
  }),

  components: {},

  methods: {},
};
</script>
<style></style>
