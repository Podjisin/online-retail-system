<template>
  <p>
    Viewing Customer with ID:
    {{ this.id ? this.id : this.customer.customer_id }}
  </p>

  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title> Account Information </v-toolbar-title>
      <!-- <v-btn
        :icon="form.showForm ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="form.showForm = !form.showForm"
      >
      </v-btn> -->

      <v-tooltip text="Expand Account Details" location="top">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :icon="form.showForm ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="form.showForm = !form.showForm"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="form.showForm">
        <v-card-text v-if="!this.loading">
          <v-form>
            <v-container grid-list-xs>
              <v-row>
                <v-col cols="auto">
                  <v-row>
                    <v-col>
                      <v-avatar color="grey" rounded="1" size="200">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                          cover
                        ></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center">
                    <v-col>
                      <v-btn
                        color="primary"
                        prepend-icon="mdi-pencil"
                        variant="outlined"
                        block
                      >
                        Edit Picture
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        label="Extra Information"
                        variant="outlined"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <!-- <v-row class="text-center">
                    <v-col>
                      <h2>Account Information</h2>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.first_name"
                        :rules="[rules.required]"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.last_name"
                        :rules="[rules.required]"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.email"
                        :rules="[rules.email]"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.phone_number"
                        :rules="[rules.required, rules.number]"
                        label="Phone Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.address"
                        :rules="[rules.required]"
                        label="Address"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="text-center">
                    <v-col>
                      <h2>Account Settings</h2>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="this.customer.username"
                        :rules="[rules.required]"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        :type="form.showPassword ? 'text' : 'password'"
                        :rules="[rules.password]"
                        label="Password"
                        :append-inner-icon="
                          form.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                        "
                        @click:append-inner="
                          form.showPassword = !form.showPassword
                        "
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-end">
                    <v-col>
                      <v-btn
                        color="error"
                        prepend-icon="mdi-close"
                        block
                        @click="goBack"
                      >
                        Cancel</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn color="success" prepend-icon="mdi-check" block>
                        Save</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  <br />
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title> Order Details </v-toolbar-title>
      <!-- <v-btn icon="mdi-plus" @click="orderDetailsTable.dialog.show = true">
      </v-btn> -->

      <v-tooltip text="Add Order" location="top">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-plus"
            @click="orderDetailsTable.dialog.show = true"
          >
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Refresh" location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-refresh" @click="loadOrders"> </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Expand Order Details" location="top">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :icon="
              orderDetailsTable.showTable
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="orderDetailsTable.showTable = !orderDetailsTable.showTable"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="orderDetailsTable.showTable">
        <v-data-table :headers="orderDetailsTable.headers">
          <template #item.actions="{ item }">
            <v-tooltip text="Edit or View" location="top">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  small
                  color="primary"
                  icon="mdi-pencil"
                  :key="item"
                  class="ma-2"
                  sortable="false"
                  variant="text"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-data-table>

        <v-dialog
          v-model="orderDetailsTable.dialog.show"
          scrollable
          width="700px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary">
              <v-toolbar-title>Place New Order</v-toolbar-title>
              <v-btn
                icon="mdi-close"
                @click="orderDetailsTable.dialog.show = false"
              >
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-container grid-list-xs fluid>
                <v-row>
                  <v-col cols="4" class="d-flex justify-center">
                    <v-avatar color="grey" rounded="1" size="200">
                      <v-img>
                        <template #placeholder>
                          <v-progress-circular
                            size="200"
                            indeterminate
                          ></v-progress-circular>
                        </template>
                      </v-img>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col>
                        <!-- <v-text-field label="Search Item"></v-text-field> -->
                        <v-autocomplete
                          v-model="orderDetailsTable.dialog.search.selected"
                          :items="orderDetailsTable.dialog.search.items"
                          label="Search Item"
                          hide-details
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="orderDetailsTable.dialog.form.quantity"
                          label="Quantity"
                          :rules="[rules.number, rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-col>
                            <h4>Quantity Left in Storage:</h4>
                          </v-col>
                          <v-col> <p color="primary-text">0</p> </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="success"
                          prepend-icon="mdi-plus"
                          block
                          @click="addToList"
                          >Add to list
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-data-table
                      :headers="orderDetailsTable.dialog.dataTable.headers"
                      :items="orderDetailsTable.dialog.dataTable.items"
                      item-key="order_id"
                    >
                      <template #item.actions="{ item }">
                        <v-tooltip text="Edit or View" location="top">
                          <template #activator="{ props }">
                            <v-btn
                              v-bind="props"
                              small
                              color="primary"
                              icon="mdi-pencil"
                              :key="item.order_id"
                              class="ma-2"
                              sortable="false"
                              variant="text"
                            >
                            </v-btn>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                    <!-- <v-card>
                      <v-card-text>
                        <h4>List of Orders</h4>
                        <v-data-table
                          :headers="orderDetailsTable.dialog.dataTable.headers"
                          :items="orderDetailsTable.dialog.dataTable.items"
                          item-key="order_id"
                        >
                          <template #item.actions="{ item }">
                            <v-tooltip text="Edit or View" location="top">
                              <template #activator="{ props }">
                                <v-btn
                                  v-bind="props"
                                  small
                                  color="primary"
                                  icon="mdi-pencil"
                                  :key="item.order_id"
                                  class="ma-2"
                                  sortable="false"
                                  variant="text"
                                >
                                </v-btn>
                              </template>
                            </v-tooltip>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card> -->
                  </v-col>
                </v-row>
                <br />
                <v-row>
                  <v-col>
                    <v-textarea
                      color="info"
                      v-model="orderDetailsTable.dialog.form.additionalDetails"
                      label="Additional Details"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row
                  v-for="(item, index) in orderDetailsTable.dialog.form
                    .addedFees"
                  :key="index"
                >
                  <v-col :item="item">
                    <v-text-field v-model="item.title" label="Description">
                    </v-text-field>
                  </v-col>
                  <v-col :item="item">
                    <v-text-field v-model="item.amount" label="Amount">
                      <template #append>
                        <v-tooltip text="Remove Fee" location="top">
                          <template #activator="{ props }">
                            <v-btn
                              elevation="0"
                              v-bind="props"
                              icon
                              @click="removeFeeField(index)"
                              text
                              density="compact"
                            >
                              <v-icon color="error"> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      color="success"
                      prepend-icon="mdi-plus"
                      block
                      variant="outlined"
                      @click="addFeeField"
                    >
                      Add a fee
                    </v-btn>
                  </v-col>
                </v-row>
                <br />

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="orderDetailsTable.dialog.form.orderType"
                      label="Type"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="orderDetailsTable.dialog.form.voucher"
                      label="Promotion / Voucher Code"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="orderDetailsTable.dialog.form.totalComputedPrice"
                      label="Total Computed Price"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn
                color="success"
                prepend-icon="mdi-plus"
                @click="onSubmit"
                :disabled="orderDetailsTable.dialog.dataTable.items <= 0"
                >Place Order
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-expand-transition>
  </v-card>
  <br />
</template>
<script>
import { toast } from "vuetify-sonner";

import { useCustomerStore } from "@/store/app";
import { formatTimestamp, rules } from "@/utils/helpers";

export default {
  data: () => ({
    loading: true,
    id: "000000",

    form: {
      showPassword: false,
      showForm: false,
    },

    customer: {
      created: "",
      updated: "",
      customer_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      username: "",
    },

    orderDetailsTable: {
      showTable: true,
      dialog: {
        show: false,
        search: {
          term: "",
          items: ["None"],
          selected: [],
          image: "",
        },
        form: {
          quantity: 0,
          additionalDetails: "No additional details",
          orderType: "Normal Order",
          voucher: "None",
          addedFees: [],
          totalComputedPrice: 0,
        },
        dataTable: {
          items: [],
          headers: [
            {
              title: "Cart",
              align: "center",
              children: [
                {
                  title: "ID",
                  key: "product_id",
                },
                {
                  title: "Product Name",
                  key: "product_name",
                },
                {
                  title: "Price",
                  key: "price",
                },
                {
                  title: "Actions",
                  key: "action",
                },
              ],
            },
          ],
        },
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

    // rules: {
    //   required: (value) => !!value || "Field is required!",
    //   number: (value) => {
    //     return !isNaN(value) || "Field must be a number!";
    //   },

    //   image: (value) => {
    //     if (!value) {
    //       // If no file is selected, return true (valid)
    //       return true;
    //     }

    //     // Check if the file has a valid type property
    //     if (!value[0] || typeof value[0].type !== "string") {
    //       return "File type is invalid!";
    //     }

    //     // Check if the file type is image/png or image/jpeg
    //     if (
    //       !(value[0].type === "image/png" || value[0].type === "image/jpeg")
    //     ) {
    //       return "File must be an image (PNG or JPEG)!";
    //     }

    //     // Check if the file size is less than 2MB
    //     if (value[0].size > 2000000) {
    //       return "File size must be at most 2MB!";
    //     }

    //     // If all checks pass, return true (valid)
    //     return true;
    //   },
    //   email: (value) => {
    //     // Check if the email is valid
    //     if (!value || value === undefined) return "Email is required!";
    //     if (
    //       !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //         value
    //       )
    //     ) {
    //       return "Email is invalid!";
    //     }
    //     return true;
    //   },

    //   password: (value) => {
    //     // Check if the password is valid
    //     if (!value || value === undefined) return "Password is required!";
    //     if (value.length < 8) {
    //       return "Password must be at least 8 characters!";
    //     }
    //     return true;
    //   },

    //   confirmPassword: (value) => {
    //     console.log("confirmPassword", value);
    //     // Check if the confirm password is valid
    //     const password = this.localItem?.password;

    //     if (!value || value === undefined) {
    //       return "Confirm Password is required!";
    //     }
    //     if (value !== password) {
    //       return "Passwords do not match!";
    //     }
    //     return true;
    //   },
    // },

    rules: rules,
  }),

  methods: {
    formatTimeStamp(timestamp) {
      return formatTimestamp(timestamp);
    },

    goBack() {
      this.$router.push({ name: "CustomerPage" });
    },

    loadOrders() {
      toast("Items Loaded", {
        description: `Total of 0 items loaded`,
        prependIcon: "mdi-check-circle",
        cardProps: {
          color: "success",
        },
      });
    },

    addFeeField() {
      this.orderDetailsTable.dialog.form.addedFees.push({
        title: "none",
        amount: 0,
      });
    },

    removeFeeField(index) {
      this.orderDetailsTable.dialog.form.addedFees.splice(index, 1);
    },

    addToList() {},

    onSubmit() {},
  },

  async created() {
    this.loading = true;
    const customerStore = useCustomerStore();
    this.id = customerStore.customer_id;
    this.orderDetailsTable.items = customerStore.customer.order_details;
    console.log("id", this.id);

    const state = await customerStore.getCustomerDetails(this.id);
    if (!state) {
      return console.log("Customer not found");
    }
    this.customer = {
      created: customerStore.customer.details.created,
      updated: customerStore.customer.details.updated,
      customer_id: customerStore.customer.details.customer_id,
      first_name: customerStore.customer.details.first_name,
      last_name: customerStore.customer.details.last_name,
      email: customerStore.customer.details.email,
      phone_number: customerStore.customer.details.phone_number,
      address: customerStore.customer.details.address,
      username: customerStore.customer.details.account_details.username,
    };

    this.orderDetailsTable.items =
      customerStore.customer.details.order_detailss;
    this.loading = false;
  },
};
</script>
<style></style>
