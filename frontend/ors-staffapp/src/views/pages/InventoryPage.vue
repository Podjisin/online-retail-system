<template>
  <v-card min-height="950px">
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <v-card class="text-center bg-success">
            <v-card-title>{{ totalInventoryItem }}</v-card-title>
            <v-card-subtitle>Total number of Products</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="text-center bg-error">
            <v-card-title>{{ totalInventoryItem }}</v-card-title>
            <v-card-subtitle>Out of Stock</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="text-center bg-info">
            <v-card-title>{{ totalInventoryItemQty }}</v-card-title>
            <v-card-subtitle>Total Qty of Stock</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col>
          <v-card elevation="0">
            <v-text-field
              v-model="inventorySearchField.term"
              label="Search"
              append-inner-icon="mdi-magnify"
              class="pt-6 pa-2"
            >
              <!-- <template #append>
                <v-btn icon="mdi-plus" color="success" text @click="newItemBtn">
                </v-btn>
              </template> -->
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
              <v-btn
                prepend-icon="mdi-plus"
                color="success"
                text
                @click="newItemBtn"
              >
                Add New Item
              </v-btn>

              <v-btn
                prepend-icon="mdi-refresh"
                color="info"
                text
                @click="loadInventory"
              >
                Refresh
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="py-2"></v-divider>
      <v-row v-if="!itemLoading">
        <v-col
          v-for="(item, index) in inventoryPagination"
          :key="index"
          xs="12"
          sm="6"
          md="4"
          lg="3"
        >
          <InvItemCard :item="item" @onUpdate="handleUpdateItemEvent">
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
  <div>
    <SnackBar
      :model="snackbar.model"
      :title="snackbar.title"
      :color="snackbar.color"
    >
    </SnackBar>
  </div>
</template>
<script>
import InvItemCard from "@/components/InvItemCard.vue";
import InvItemDialog from "@/components/InvItemDialog.vue";
import SnackBar from "@/components/SnackBar.vue";

import { useProductStore } from "@/store/app";

import { mapStores } from "pinia";
export default {
  data: () => ({
    items: [],
    totalInventoryItem: 0,
    totalInventoryItemQty: 0,
    totalItemThresholdReached: 0,

    itemLoading: false,
    inventorySearchField: {
      term: "",
      showInfo: false,
    },

    pagination: {
      currentPage: 1,
      rowPerPage: 8,
    },

    newItemDialog: {
      model: false,
    },

    snackbar: {
      model: false,
      title: "",
      color: "info",
    },
  }),

  components: {
    InvItemCard,
    InvItemDialog,
    SnackBar,
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
              return propValue.toString() === filterObjects.value;
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

    async loadInventory() {
      this.itemLoading = true;
      const productStore = useProductStore();
      const state = await productStore.getAllInventory();

      if (!state) {
        this.snackbar.model = true;
        this.snackbar.title = "Error!";
        this.snackbar.color = "error";
        setTimeout(() => {
          this.snackbar.model = false;
        }, 2000);
        return;
      }

      const data = productStore.inventory;
      this.items = data;
      this.totalInventoryItem = data.length;
      // calculate the sum of quantities of all items in the inventory
      this.totalInventoryItemQty = data.reduce((total, item) => {
        return total + parseFloat(item.stock_quantity);
      }, 0);

      this.totalItemThresholdReached = data.filter(
        (item) => parseFloat(item.stock_qty) < parseFloat(item.stock_threshold)
      ).length;

      this.itemLoading = false;
    },

    async handleNewItemEvent(newItem) {
      const productStore = useProductStore();
      console.log("New Item: ", newItem);
      try {
        await productStore.postItem(newItem);
        this.loadInventory();
      } catch (error) {
        console.log(error);
      }

      this.snackbar.model = true;
      this.snackbar.title = "Success!";
      this.snackbar.color = "success";
      setTimeout(() => {
        this.snackbar.model = false;
      }, 2000);
    },

    async handleUpdateItemEvent(item) {
      console.log("Update Triggered");

      const productStore = useProductStore();

      await productStore.updateItem(item);
      console.log("handleUpdateItemEvent ", item);

      this.snackbar.model = true;
      this.snackbar.title = "Success!";
      this.snackbar.color = "success";
      setTimeout(() => {
        this.snackbar.model = false;
      }, 2000);
    },
  },

  created() {
    this.loadInventory();
  },
};
</script>
<style></style>
