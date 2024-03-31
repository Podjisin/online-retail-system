<template>
  <v-card min-height="950px">
    <v-container grid-list-xs fluid>
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
        <v-toolbar title="Search Field Capabilities" color="info">
          <v-spacer></v-spacer>
          <v-btn icon @click="inventorySearchField.showInfo = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <p>
              The search field allows you to filter inventory items based on
              various criteria. You can use the following operators:
            </p>
            <ul>
              <li><strong>=</strong>: Exact match</li>
              <li><strong>&lt;</strong>: Less than</li>
              <li><strong>&gt;</strong>: Greater than</li>
            </ul>
            <p>
              You can combine multiple filters using spaces, and the search will
              return items that match all the specified criteria.
            </p>
            <br />
            <p>Attributes:</p>
            <ul>
              <li><strong>price</strong>: Price of the product</li>
              <li><strong>stock_qty</strong>: Stock Quantity</li>
            </ul>
            <p>Examples: price&lt;100</p>
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
     */
    filteredInventory() {
      const searchTerm = this.inventorySearchField.term.toLowerCase().trim();

      if (!searchTerm) return this.items;

      /**
       * Splits the search term into individual filters by splitting on whitespace
       * before =, <, > operators. Maps the filters to objects with key, operator,
       * and value properties.
       */
      const filters = searchTerm.split(/\s(?=[=<>])/).map((filter) => {
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
          if (!filterObjects.operator) {
            return Object.values(inventory).some((prop) =>
              prop.toString().toLowerCase().includes(filterObjects.key)
            );
          }

          const propValue = inventory[filterObjects.key];

          if (!propValue) return false;

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
      await productStore.getAllInventory();

      const data = productStore.inventory;
      this.items = data;

      setTimeout(() => {
        this.itemLoading = false;
      }, 2000);
      // console.log("Inventory Page: ", this.items);
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
