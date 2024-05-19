<template>
  <v-container>
    <!-- <v-row>
      <v-col> I dont know what to put here at the moment ¯\_(ツ)_/¯</v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <v-card min-height="200px" elevation="3">
          <div class="pa-4">
            <div class="ps-4 text-caption text-medium-emphasis">
              {{ sales.title }}
            </div>

            <v-card-title class="pt-0 mt-n1 d-flex align-center">
              <div class="me-2">{{ sales.value }}</div>

              <v-chip
                :color="sales.color"
                :prepend-icon="`mdi-arrow-${
                  sales.change.startsWith('-') ? 'down' : 'up'
                }`"
                class="pe-1"
                size="x-small"
                label
              >
                <template v-slot:prepend>
                  <v-icon size="10"></v-icon>
                </template>

                <span class="text-caption">{{ sales.change }}</span>
              </v-chip>
            </v-card-title>
          </div>
          <v-card-text>
            <v-sparkline
              :color="sales.color"
              :gradient="[
                `${sales.color}E6`,
                `${sales.color}33`,
                `${sales.color}00`,
              ]"
              :model-value="sales.data"
              height="50"
              line-width="1"
              min="0"
              padding="0"
              fill
              smooth
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-height="200px" elevation="3">
          <div class="pa-4">
            <div class="ps-4 text-caption text-medium-emphasis">
              {{ orders.title }}
            </div>

            <v-card-title class="pt-0 mt-n1 d-flex align-center">
              <div class="me-2">{{ orders.value }}</div>

              <v-chip
                :color="orders.color"
                :prepend-icon="`mdi-arrow-${
                  orders.change.startsWith('-') ? 'down' : 'up'
                }`"
                class="pe-1"
                size="x-small"
                label
              >
                <template v-slot:prepend>
                  <v-icon size="10"></v-icon>
                </template>

                <span class="text-caption">{{ orders.change }}</span>
              </v-chip>
            </v-card-title>
          </div>

          <v-card-text>
            <v-sparkline
              :color="orders.color"
              :gradient="[`${orders.color}00`]"
              :model-value="orders.data"
              height="50"
              line-width="1"
              min="0"
              padding="0"
              fill
              smooth
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card min-height="200px" elevation="3">
          <div class="pa-4">
            <div class="ps-4 text-caption text-medium-emphasis">
              {{ accounts.title }}
            </div>

            <v-card-title class="pt-0 mt-n1 d-flex align-center">
              <div class="me-2">{{ accounts.value }}</div>

              <v-chip
                :color="accounts.color"
                :prepend-icon="`mdi-arrow-${
                  orders.change.startsWith('-') ? 'down' : 'up'
                }`"
                class="pe-1"
                size="x-small"
                label
              >
                <template v-slot:prepend>
                  <v-icon size="10"></v-icon>
                </template>

                <span class="text-caption">{{ accounts.change }}</span>
              </v-chip>
            </v-card-title>
          </div>

          <v-card-text>
            <v-sparkline
              :color="accounts.color"
              :model-value="accounts.data"
              :type="accounts.variant"
              :labels="accounts.labels"
              :gradient="[
                `${accounts.color}E6`,
                `${accounts.color}33`,
                `${accounts.color}00`,
              ]"
              height="50"
              line-width="10"
              min="0"
              padding="0"
              fill
              smooth
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card min-height="200px" elevation="3">
          <v-card-title class="bg-primary"> Latest Orders </v-card-title>

          <v-card-text>
            <v-list
              lines="one"
              v-for="item in cardItems.latestOrders"
              :key="item.id"
            >
              <v-list-item two-line>
                <template #title> {{ item.title }} </template>
                <template #append>
                  <v-tooltip text="View" location="top">
                    <template #activator="{ props }">
                      <v-btn
                        elevation="0"
                        v-bind="props"
                        icon
                        text
                        density="compact"
                      >
                        <v-icon color="info"> mdi-information </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </template>
              </v-list-item>
              <template #prepend></template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <!-- <v-row>
          <v-col>
            <h2>Inventory Stats</h2>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <v-card min-height="200px" elevation="3">
              <v-card-title>Inventory Stats</v-card-title>

              <v-card-text>
                <v-row>
                  <v-col>
                    <v-card min-height="200px" elevation="3">
                      <v-card-title class="bg-error"> Restock </v-card-title>

                      <v-list
                        lines="one"
                        v-for="item in cardItems.restock"
                        :key="item.id"
                      >
                        <v-list-item>
                          <template #title> {{ item.title }} </template>
                          <template #append>
                            <v-tooltip text="View" location="top">
                              <template #activator="{ props }">
                                <v-btn
                                  elevation="0"
                                  v-bind="props"
                                  icon
                                  text
                                  density="compact"
                                >
                                  <v-icon color="info">
                                    mdi-information
                                  </v-icon>
                                </v-btn>
                              </template>
                            </v-tooltip>
                          </template>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card min-height="200px" elevation="3">
                      <v-card-title class="bg-success"
                        >Stable Stock</v-card-title
                      >

                      <v-list
                        lines="one"
                        v-for="item in cardItems.stableStock"
                        :key="item.id"
                      >
                        <v-list-item>
                          <template #title> {{ item.title }} </template>
                          <template #append>
                            <v-tooltip text="View" location="top">
                              <template #activator="{ props }">
                                <v-btn
                                  elevation="0"
                                  v-bind="props"
                                  icon
                                  text
                                  density="compact"
                                >
                                  <v-icon color="info">
                                    mdi-information
                                  </v-icon>
                                </v-btn>
                              </template>
                            </v-tooltip>
                          </template>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card min-height="200px" elevation="3" color="primary">
                      <v-card-title class="bg-info">Best Selling</v-card-title>

                      <v-list
                        lines="one"
                        v-for="(item, index) in cardItems.bestSelling"
                        :key="index"
                      >
                        <v-list-item>
                          <template #title>
                            #{{ index + 1 }} {{ item.title }}
                          </template>
                          <template #append>
                            <v-tooltip text="View" location="top">
                              <template #activator="{ props }">
                                <v-btn
                                  elevation="0"
                                  v-bind="props"
                                  icon
                                  text
                                  density="compact"
                                >
                                  <v-icon color="info">
                                    mdi-information
                                  </v-icon>
                                </v-btn>
                              </template>
                            </v-tooltip>
                          </template>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    sales: {
      title: "Sales This Month",
      icon: "mdi-sale",
      color: "#2fc584",
      variant: "bars",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      value: "31,500",
      data: [5, 2, 5, 9, 5, 10, 3, 5, 3, 7, 1, 8, 2, 9, 6],
      change: "+20.12%",
    },

    orders: {
      title: "Orders This Month",
      icon: "mdi-basket",
      color: "#2fc584",
      variant: "bars",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      value: "12,500",
      data: [5, 2, 5, 9, 5, 10, 3, 5, 3, 7, 1, 8],
      change: "+13.22%",
    },

    accounts: {
      title: "Accounts Created This Month",
      icon: "mdi-account",
      color: "#8041bf",
      variant: "bars",
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
      ],
      value: "51",
      data: [5, 2, 5, 9, 5, 10, 3, 5, 3, 7, 1, 8, 2, 9, 6],
      change: "+10.22%",
    },

    cardItems: {
      rankingCap: 4,
      latestOrders: [
        {
          id: "1",
          title: "item 1",
        },
        {
          id: "2",
          title: "item 2",
        },
        {
          id: "3",
          title: "item 3",
        },
        {
          id: "4",
          title: "item 4",
        },
        {
          id: "5",
          title: "item 5",
        },
      ],
      restock: [
        {
          id: "1",
          title: "item 1",
        },
        {
          id: "2",
          title: "item 2",
        },
        {
          id: "3",
          title: "item 3",
        },
        {
          id: "4",
          title: "item 4",
        },
      ],
      stableStock: [
        {
          id: "1",
          title: "item 1",
        },
        {
          id: "2",
          title: "item 2",
        },
        {
          id: "3",
          title: "item 3",
        },
        {
          id: "4",
          title: "item 4",
        },
      ],
      // shoould be limited to 4 items but whatever hahaha.
      bestSelling: [
        {
          id: "1",
          title: "item 1",
        },
        {
          id: "2",
          title: "item 2",
        },
        {
          id: "3",
          title: "item 3",
        },
        {
          id: "4",
          title: "item 4",
        },
      ],
    },
  }),

  components: {},

  methods: {
    /**
     * Returns the current month as a string in the format "MM".
     *
     * @returns {string} The current month as a string in the format "MM".
     */
    getCurrentMonth() {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return month;
    },
  },
};
</script>
<style></style>
