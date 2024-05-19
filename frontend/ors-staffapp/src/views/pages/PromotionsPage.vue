<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Vouchers</v-toolbar-title>
      <v-tooltip text="Generate Vouchers" location="top">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-robot"
            v-bind="props"
            @click="vouchersTable.dialog.show = true"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="vouchersTable.search.term"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-data-table :headers="vouchersTable.headers"> </v-data-table>

      <v-dialog
        v-model="vouchersTable.dialog.show"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title> Generate Vouchers </v-toolbar-title>
            <v-btn icon="mdi-close" @click="vouchersTable.dialog.show = false">
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container grid-list-xl>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Name"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p v-if="vouchersTable.dialog.calendar.items.length">
                    {{ formatDate(sortedDates[0]) }} -
                    {{ formatDate(sortedDates[sortedDates.length - 1]) }}
                  </p>
                  <p v-else>Select Start and End date from the calendar</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-date-picker
                    v-model="vouchersTable.dialog.calendar.items"
                    show-adjacent-months
                    hide-details
                    width="100%"
                    multiple="2"
                    title="Select Range"
                    color="primary"
                    elevation="2"
                    landscape
                    :rules="[rules.required]"
                  >
                  </v-date-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Discount (%)"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Minimum Purchase"
                    :rules="[rules.required, rules.number]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Quantity of randomly generated voucher code"
                    :rules="[rules.required, rules.number]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Description"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              color="success"
              prepend-icon="mdi-content-save"
              block
              @click="vouchersTable.dialog.show = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
  <br />

  <!-- <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Seasonal Promos</v-toolbar-title>
      <v-btn prepend-icon="mdi-calendar">Add Schedule</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table :headers="seasonPromos.headers"> </v-data-table>
    </v-card-text>
  </v-card> -->

  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Email Marketing</v-toolbar-title>
      <!-- <v-btn prepend-icon="mdi-calendar">Add Schedule</v-btn> -->
      <v-tooltip text="Open email history" location="top">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-book"
            v-bind="props"
            @click="emailMarketing.dialog.show = true"
          >
          </v-btn>
          <v-dialog v-model="emailMarketing.dialog.show">
            <v-card>
              <v-toolbar color="primary">
                <v-toolbar-title> Email Marketing History </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  icon="mdi-close"
                  @click="emailMarketing.dialog.show = false"
                ></v-btn>
              </v-toolbar>
              <v-card-text>
                <v-data-table :headers="emailMarketing.dialog.headers">
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="emailMarketing.items.subject"
                  label="Email Subject"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea
                  v-model="emailMarketing.items.content"
                  label="Content"
                >
                  <template #details>
                    Use markdown to format your content and enclose variables
                    with double curly braces. { }
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn color="success" prepend-icon="mdi-send">Send</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { rules } from "@/utils/helpers";
export default {
  data: () => ({
    loading: true,
    vouchersTable: {
      search: {
        term: "",
      },
      items: [],
      dialog: {
        show: false,
        calendar: {
          items: [],
          show: false,
        },
      },
      headers: [
        {
          title: "Id",
          key: "promotion_id",
        },
        {
          title: "Name",
          key: "promotion_name",
        },
        {
          title: "Start",
          key: "start_date",
        },
        {
          title: "End",
          key: "end_date",
        },
        {
          title: "Discount (-%)",
          key: "discount",
        },
        {
          title: "Min Purchase",
          key: "min_purchase_amount",
        },
        {
          title: "Actions",
          key: "actions",
        },
      ],
    },

    seasonPromos: {
      items: [],
      headers: [
        {
          title: "Id",
          key: "promotion_id",
        },
        {
          title: "Name",
          key: "promotion_name",
        },
        {
          title: "Start",
          key: "start_date",
        },
        {
          title: "End",
          key: "end_date",
        },
        {
          title: "Discount (-%)",
          key: "discount",
        },
        {
          title: "Min Purchase",
          key: "min_purchase_amount",
        },
        {
          title: "Actions",
          key: "actions",
        },
      ],
    },

    emailMarketing: {
      items: {
        subject: "Promo",
        content:
          "Sample Text: Hi, we have a promo this week. use {{code}} to get {{discount.id}} off from your next purchase.",
      },
      dialog: {
        headers: [
          {
            title: "Id",
            key: "promotion_id",
          },
          {
            title: "Created",
            key: "created",
          },
          {
            title: "Subject",
            key: "subject",
          },
          {
            title: "Actions",
            key: "actions",
          },
        ],
        show: false,
        items: [],
      },
    },
    rules: rules,
  }),

  watch: {
    // "this.voucherTable.dialog.calendar.items": function (value) {
    //   console.log(value);
    // },
  },

  computed: {
    sortedDates() {
      if (this.vouchersTable.dialog.calendar.items.length === 0) return [];
      const arr = [...this.vouchersTable.dialog.calendar.items]; // Create a new array
      const res = arr.sort((a, b) => new Date(a) - new Date(b)); // Sort dates properly
      return res;
    },
  },

  methods: {
    formatDate(date) {
      console.log(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>
<style></style>
