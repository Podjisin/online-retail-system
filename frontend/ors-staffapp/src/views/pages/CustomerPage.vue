<template>
  <v-card min-height="500px">
    <v-card-subtitle
      >Auto Refresh in:
      <!-- <span v-if="countdownToggle">{{ countdown }}</span> -->
    </v-card-subtitle>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <v-card class="text-center" color="primary">
            <v-card-title>{{ totalItems }}</v-card-title>
            <v-card-subtitle>Total number of Customers</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="0">
            <br />

            <v-text-field
              color="primary"
              v-model="searchField.term"
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
              <v-tooltip text="Add New Customer">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-plus"
                    color="success"
                    variant="outlined"
                    @click="dialog.model = true"
                  >
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Refresh">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-refresh"
                    color="info"
                    variant="outlined"
                    @click="getAllData"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            item-key="customer_id"
            :loading="loading"
            :loading-text="filteredItems == 0 ? 'Loading...' : `loaded`"
          >
            <template #item.created="{ item }">
              {{ formatTimestamp(item.created) }}
            </template>
            <template #item.actions="{ item }">
              <v-tooltip text="Open Customer Details and Orders" location="top">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    small
                    color="primary"
                    icon="mdi-pencil"
                    :key="item.customer_id"
                    class="ma-2"
                    sortable="false"
                    variant="text"
                    @click="handleEditEvent(item.customer_id)"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <!-- <div>
    <router-view></router-view>
    <v-dialog v-model="customerDetailsDialog.model" scrollable>
      <router-view></router-view>
    </v-dialog>
  </div> -->
  <div>
    <CustomerDialog
      :model="dialog.model"
      :mode="dialog.mode"
      :item="item"
      @onConfirm="handleSaveEvent"
      @update:model="dialog.model = false"
    ></CustomerDialog>
  </div>
</template>
<script>
import CustomerDialog from "@/components/CustomerDialog.vue";
import { toast } from "vuetify-sonner";

import { useCustomerStore } from "@/store/app";
import { formatTimestamp } from "@/utils/helpers";
export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      {
        title: "Customer ID",
        key: "customer_id",
      },
      {
        title: "firstname",
        key: "first_name",
      },
      {
        title: "Lastname",
        key: "last_name",
      },
      {
        title: "Created",
        key: "created",
      },
      {
        title: "Actions",
        key: "actions",
      },
    ],
    items: [],
    item: [],
    loading: true,
    totalItems: 0,

    searchField: {
      term: "",
      showInfo: false,
    },

    dialog: {
      model: false,
      mode: "create",
    },

    customerDetailsDialog: {
      model: false,
    },
  }),

  components: {
    CustomerDialog,
  },

  computed: {
    filteredItems() {
      const customerStore = useCustomerStore();
      const searchTerm = this.searchField.term.toLowerCase().trim();

      if (!customerStore || !customerStore.customers) return [];
      return customerStore.customers.filter((item) => {
        return Object.values(item).some((value) => {
          if (value == null) return false;
          return value.toString().toLowerCase().includes(searchTerm);
        });
      });
    },
  },

  methods: {
    formatTimestamp(timestamp) {
      return formatTimestamp(timestamp);
    },

    async getAllData() {
      this.loading = true;
      const customerStore = useCustomerStore();
      const res = await customerStore.getAllCustomers();
      try {
        if (!res) {
          console.log("getAllData:  Something went wrong");
          return;
        }

        this.totalItems = parseInt(res.totalCustomers);
        this.loading = false;
        toast("Customer Accounts", {
          description: `Total of ${customerStore.totalCustomers} accounts loaded`,
          prependIcon: "mdi-check-circle",
          cardProps: {
            color: "success",
          },
        });
      } catch (error) {
        toast("Error!", {
          description: error.message,
          prependIcon: "mdi-alert-circle-outline",
          cardProps: {
            color: "error",
          },
        });
      }
    },

    async handleSaveEvent(item, mode) {
      const customerStore = useCustomerStore();
      try {
        if (mode === "create") {
          console.log("handleSaveEvent:  Creating new customer", item);
          await customerStore.addCustomer(item);
        } else {
          console.log("handleSaveEvent:  Updating customer", item);
          // await customerStore.updateCustomer(item);
        }
        this.getAllData();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Handles the edit event for a customer.
     *
     * @param {number} id - The ID of the customer to edit.
     * @returns {void}
     */
    async handleEditEvent(id) {
      const customerStore = useCustomerStore();

      const res = customerStore.setCustomer(id);
      if (!res) {
        console.log("handleEditEvent:  Something went wrong");
        return;
      }
      console.log("handleEditEvent:  Editing customer", id);
      // this.customerDetailsDialog.model = true;
      this.$router.push({
        name: "CustomerDetailPage",
        params: { id },
      });
    },
  },

  created() {
    this.getAllData();
  },
};
</script>
<style></style>
