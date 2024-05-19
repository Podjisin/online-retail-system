<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card class="text-center" color="primary">
            <v-card-title>0</v-card-title>
            <v-card-subtitle>Total Orders</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="text-center" color="error">
            <v-card-title>0</v-card-title>
            <v-card-subtitle>Cancelled Orders</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="text-center" color="warning">
            <v-card-title>0</v-card-title>
            <v-card-subtitle>Pending Orders</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="text-center" color="success">
            <v-card-title>0</v-card-title>
            <v-card-subtitle>Completed Orders</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="0">
            <br />

            <v-text-field
              color="primary"
              v-model="ordersTable.searchField.term"
              label="Search"
              class="mx-auto"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              rounded
              variant="outlined"
            >
              <!-- <template #prepend>
                <v-btn icon="mdi-information-outline" color="info"> </v-btn>
              </template> -->
            </v-text-field>
            <v-card-actions class="justify-center">
              <v-btn
                prepend-icon="mdi-refresh"
                color="info"
                @click="loadOrders"
              >
                <span>Refresh</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row>
        <v-col>
          <v-data-table :headers="ordersTable.headers"></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { toast } from "vuetify-sonner";

export default {
  data: () => ({
    ordersTable: {
      show: true,
      searchField: {
        term: "",
      },
      items: [],
      headers: [
        {
          title: "Order ID",
          key: "order_id",
        },
        {
          title: "Type",
          key: "order_type",
        },
        {
          title: "Customer ID",
          key: "customer_id",
        },
        {
          title: "Order Date",
          key: "order_date",
        },
        {
          title: "Total # of items",
          key: "total_quantity",
        },
        {
          title: "Total Amount",
          key: "total_amount",
        },
        {
          title: "Actions",
          key: "actions",
        },
      ],
    },
  }),
  methods: {
    loadOrders() {
      toast("Items Loaded", {
        description: `Total of 0 items loaded`,
        prependIcon: "mdi-check-circle",
        cardProps: {
          color: "success",
        },
      });
    },
  },

  created() {
    this.loadOrders();
  },
};
</script>
<style></style>
