<template>
  <v-card min-height="950px">
    <v-card-subtitle
      >Auto Refresh in:
      <span v-if="countdownToggle">{{ countdown }}</span>
    </v-card-subtitle>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <v-card class="text-center" color="primary">
            <v-card-title>{{ totalInventoryItem }}</v-card-title>
            <v-card-subtitle>Total number of Products</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="text-center" color="error">
            <v-card-title>{{ totalOutOfStock }}</v-card-title>
            <v-card-subtitle>Out of Stock</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="text-center" color="warning">
            <v-card-title>{{ totalItemThresholdReached }}</v-card-title>
            <v-card-subtitle>Need to Stock</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="text-center" color="info">
            <v-card-title>{{ totalInventoryItemQty }}</v-card-title>
            <v-card-subtitle>Total Qty of Stock</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col>
          <v-card elevation="0">
            <br />
            <v-text-field
              v-model="inventorySearchField.term"
              label="Search"
              class="mx-auto"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              rounded
              variant="outlined"
            >
              <template #prepend>
                <v-btn
                  icon="mdi-information-outline"
                  color="info"
                  @click="
                    inventorySearchField.showInfo =
                      !inventorySearchField.showInfo
                  "
                >
                </v-btn>
              </template>
            </v-text-field>

            <v-card-actions class="justify-center">
              <v-tooltip text="Add new item">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-plus"
                    color="success"
                    variant="outlined"
                    @click="newItemDialog.model = true"
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
                    text
                    @click="loadInventory"
                    variant="outlined"
                  >
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Toggle Auto Refresh">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="
                      countdownToggle
                        ? 'mdi-toggle-switch-outline'
                        : 'mdi-toggle-switch-off-outline'
                    "
                    :color="countdownToggle ? 'primary' : 'secondary'"
                    text
                    @click="countdownToggle = !countdownToggle"
                    :variant="countdownToggle ? 'flat' : 'outlined'"
                  >
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Download">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-download"
                    color="secondary"
                    variant="outlined"
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

      <v-row v-if="!itemLoading">
        <v-col
          v-for="(item, index) in inventoryPagination"
          :key="index"
          xs="12"
          sm="6"
          md="3"
        >
          <InvItemCard
            :item="item"
            @onUpdate="handleUpdateItemEvent"
            @onHold="countdownToggle = false"
          >
          </InvItemCard>
        </v-col>

        <v-col v-if="filteredInventory.length === 0" xs="12">
          <div class="text-center">
            <h1>No Result</h1>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="itemLoading">
        <v-col>
          <div class="text-center">
            <v-progress-linear
              color="secondary"
              indeterminate
            ></v-progress-linear>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <br />
  <div>
    <v-card color="surface-light">
      <div class="text-center">
        <v-pagination
          v-model="pagination.currentPage"
          :length="
            Math.ceil(filteredInventory.length / this.pagination.rowPerPage)
          "
        ></v-pagination>
      </div>
    </v-card>
  </div>

  <div>
    <v-dialog v-model="inventorySearchField.showInfo" max-width="600px">
      <v-card>
        <v-toolbar title="Instructions" color="primary">
          <v-spacer></v-spacer>
          <v-btn icon @click="inventorySearchField.showInfo = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <p>
              The search field is capable of boolean operators and attribute
              search. meaning, search field allows you to filter inventory items
              based on various criteria. You can use the following operators:
            </p>
            <ul>
              <li><strong>=</strong>: Exact match</li>
              <li><strong>&lt;</strong>: Less than</li>
              <li><strong>&gt;</strong>: Greater than</li>
            </ul>
            <p>
              You can combine multiple filters using "," and the search will
              return items that match all the specified criteria.
            </p>
            <br />
            <p>Attributes:</p>
            <ul>
              <li><strong>price</strong>: Price of the product</li>
              <li><strong>stock_quantity</strong>: Stock Quantity</li>
              <li><strong>stock_threshold</strong>: Stock Threshold</li>
              <li><strong>category_id</strong></li>
            </ul>
            <br />
            <p>Examples:</p>
            <ul>
              <li>price=100</li>
              <li>price&lt;100, stock_quantity&lt;10</li>
            </ul>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

  <div>
    <InvItemDialog
      :model="newItemDialog.model"
      @onSave="handleNewItemEvent"
      @update:model="newItemDialog.model = false"
    ></InvItemDialog>
  </div>
</template>
<script>
import InvItemCard from "@/components/InvItemCard.vue";
import InvItemDialog from "@/components/InvItemDialog.vue";

import { toast } from "vuetify-sonner";
import { useProductStore } from "@/store/app";
import { mapStores } from "pinia";
export default {
  data: () => ({
    refreshInterval: null,
    countdown: null,
    countdownToggle: false,

    items: [],
    totalInventoryItem: 0,
    totalInventoryItemQty: 0,
    totalItemThresholdReached: 0,
    totalOutOfStock: 0,

    itemLoading: false,
    inventorySearchField: {
      term: "",
      showInfo: false,
      history: ["price<100, stock_quantity<10"],
    },

    pagination: {
      currentPage: 1,
      rowPerPage: 16,
    },

    newItemDialog: {
      model: false,
    },
  }),

  components: {
    InvItemCard,
    InvItemDialog,
  },

  watch: {
    countdownToggle: {
      handler(val) {
        // console.log("countdownToggle", val);
        if (val) {
          this.toggleCountdown(true);
        } else {
          this.toggleCountdown(false);
        }
      },
      immediate: true,
    },
  },

  computed: {
    ...mapStores(useProductStore),

    /**
     * Introducing! Attribute and Boolean search because why not and I'm bored!
     * Is it optimized? idk... I'm just trying to get this working. HaHAHAHAHHAhahahaha...
     *
     * Filters the inventory items based on the search term. Splits the search term
     * into individual filters, parses them into key/operator/value, and filters the
     * inventory to only include items that match all filters.
     *
     */
    filteredInventory() {
      const searchTerm = this.inventorySearchField.term
        .toString()
        .toLowerCase()
        .trim();

      if (!searchTerm) return this.items;

      /**
       * Splits the search term into individual filters by splitting on commas
       * before =, <, > operators. Maps the filters to objects with key, operator,
       * and value properties.
       */
      const filters = searchTerm
        .split(",")
        .map((filter) => filter.replace(/\s/g, "")) // Remove spaces
        .map((filter) => {
          const [key, operator, value] = filter.split(/([=<>])/);

          return { key, operator, value };
        });

      /**
       * Filters the inventory items based on the provided search filters.
       * Iterates through each filter, checks if the inventory item matches the filter criteria,
       * and returns only inventory items that match all filters.
       * Supports filtering by exact match, less than, and greater than based on the operator.
       */
      return this.items.filter((inventory) => {
        return filters.every((filterObjects) => {
          /**
           * If the filter object does not have an operator, do a simple includes
           * check on the inventory item properties to see if any match the filter key.
           * This allows searching inventory items by partial string match without
           * specifying an operator.
           */
          if (!filterObjects.operator) {
            return Object.values(inventory).some((prop) =>
              prop !== null && prop !== undefined
                ? prop.toString().toLowerCase().includes(filterObjects.key)
                : false
            );
          }

          const propValue = inventory[filterObjects.key];

          if (!propValue) return false;

          /**
           * You already knows what happens here.
           */
          switch (filterObjects.operator) {
            case "=":
              return (
                propValue.toString().toLowerCase() ===
                filterObjects.value.toString().toLocaleLowerCase()
              );
            case "<":
              return parseFloat(propValue) < parseFloat(filterObjects.value);
            case ">":
              return parseFloat(propValue) > parseFloat(filterObjects.value);
            default:
              return false;
          }
        });
      });
    },

    /**
     * Slices the filtered inventory array
     * to paginate based on current page and rows per page.
     * Returns the sliced array as the current page of inventory.
     */
    inventoryPagination() {
      const start =
        (this.pagination.currentPage - 1) * this.pagination.rowPerPage;
      const end = start + this.pagination.rowPerPage;
      return this.filteredInventory.slice(start, end);
    },
  },

  methods: {
    newItemBtn() {
      // console.log("New item Buadasdasdadasdtton");
      this.newItemDialog.model = true;
    },

    /**
     * Toggles starting and stopping a countdown timer based on the
     * provided boolean value.
     *
     * If true, starts a countdown from 60 seconds that refreshes every 1 second,
     * decrementing the countdown by 1 each refresh.
     *
     * If false, stops the interval refreshing the countdown.
     *
     * Updates the component's countdownToggle state with the provided value.
     */
    toggleCountdown(boolean) {
      if (boolean !== this.countdownToggle) {
        this.countdownToggle = boolean;
        if (boolean) {
          const refresh = () => {
            this.countdown--;
            if (this.countdown <= 0 && this.countdownToggle) {
              this.loadInventory();
              this.countdown = 60;
            }
          };
          this.refreshInterval = setInterval(refresh, 1000);
        } else {
          clearInterval(this.refreshInterval);
        }
      }
    },

    async loadInventory() {
      this.itemLoading = true;
      const productStore = useProductStore();
      const res = await productStore.getAllInventory();

      if (!res) {
        toast("Error", {
          description: `Failed to load items`,
          prependIcon: "mdi-alert-circle-outline",
          cardProps: {
            color: "error",
          },
        });
        return;
      }

      const data = productStore.inventory;
      this.items = data;
      // console.log("loadInventory", data);
      this.totalInventoryItem = data.length;

      this.totalOutOfStock = data.filter(
        (item) =>
          parseFloat(item.stock_quantity) <= 0 &&
          parseFloat(item.stock_threshold) <= 0
      ).length;

      // calculate the sum of quantities of all items in the inventory
      this.totalInventoryItemQty = data.reduce((total, item) => {
        return total + parseFloat(item.stock_quantity);
      }, 0);

      this.totalItemThresholdReached = data.filter(
        (item) =>
          parseFloat(item.stock_quantity) < parseFloat(item.stock_threshold)
      ).length;

      // console.log(
      //   "totalItemThresholdReached: ",
      //   this.totalItemThresholdReached
      // );

      this.itemLoading = false;

      let description;
      let color;
      let prependIcon;
      // let duration;

      if (this.totalItemThresholdReached > 0) {
        description = `Total of ${this.totalInventoryItem} items(s) are loaded with ${this.totalItemThresholdReached} items(s) near out of stock`;
        prependIcon = "mdi-alert-circle-outline";
        color = "warning";
        // duration = 60000;
      } else {
        description = `Total of ${this.totalInventoryItem} items(s) are loaded`;
        prependIcon = "mdi-check-circle";
        color = "success";
        // duration = 30000;
      }

      toast("Inventory", {
        description: description,
        prependIcon: prependIcon,
        cardProps: {
          color: color,
        },
        // duration: duration,

        action: {
          // label: "dismiss",
          onClick: () => {
            toast.dismiss();
          },
          buttonProps: {
            color: "white",
            icon: "mdi-close",
          },
        },
      });

      return;
    },

    /**
     * Handles a new inventory item event by adding the new item to the product store
     * and reloading the inventory. Shows success snackbar notification.
     */
    async handleNewItemEvent(newItem) {
      const productStore = useProductStore();
      // console.log("New Item: ", newItem);
      try {
        await productStore.postItem(newItem);
      } catch (error) {
        console.log(error);
      }

      toast("Success", {
        description: `Item added`,
        prependIcon: "mdi-check-circle",
        cardProps: {
          color: "success",
        },
      });
    },

    /**
     * Handles updating an inventory item by calling the product store to update it,
     * then reloading the inventory and showing a success notification.
     */
    async handleUpdateItemEvent(item) {
      const productStore = useProductStore();

      await productStore.updateItem(item);
      // console.log("handleUpdateItemEvent ", item);

      toast("Inventory", {
        description: `Item  updated`,
        prependIcon: "mdi-check-circle",
        cardProps: {
          color: "success",
        },
      });
    },
  },

  mounted() {
    // this.loadInventory();
    this.toggleCountdown(true);
  },

  beforeUnmounted() {
    clearInterval(this.refreshInterval);
  },
};
</script>
<style></style>
