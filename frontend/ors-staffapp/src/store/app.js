// Utilities
import { defineStore } from "pinia";
import api from "@/services/api";

/**
 * Defines a Pinia store named 'app' with state and actions for managing application state.
 *
 * State includes theme, header bar, and navigator bar config pulled from localStorage.
 *
 * Actions allow updating state and saving values to localStorage.
 */
export const useAppStore = defineStore("app", {
  state: () => ({
    theme: {
      default: localStorage.getItem("theme") || "light",
      items: [
        // light: myCustomLightTheme,
        // chocolate: myCustomChocolateTheme,
        // bananaYellow: myCustomBananaYellowTheme,
        // solarized: myCustomSolarizedTheme,
        // blueViolet: myCustomBlueVioletTheme,
        // helloKittyPink: myCustomHelloKittyPinkTheme,
        // bluePink: BluePinkTheme,
        // ksuPurple: KSUPurpleTheme,
        "light",
        "dark",
        "system",
        "bluePink",
        "ksuPurple",
        "chocolate",
        "bananaYellow",
        "solarized",
        "blueViolet",
        "helloKittyPink",
      ],
    },

    settings: {
      currency: localStorage.getItem("currency") || "Php",
    },

    headerBar: {
      title: localStorage.getItem("headerBarTitle") || "Dashboard",
      subtitle: localStorage.getItem("headerBarSubtitle") || "",
    },

    navigatorBar: {
      avatar: localStorage.getItem("navigatorBarAvatar") || null,
      title: localStorage.getItem("navigatorBarTitle") || null,
      subtitle: localStorage.getItem("navigatorBarSubtitle") || null,

      drawer: localStorage.getItem("navigatorBarDrawer") || false,
      rail: false,

      indexFocus: 0,

      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: {
            name: "DashboardPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Dashboard";
          },
        },

        {
          title: "Inventory",
          icon: "mdi-warehouse",
          to: {
            name: "InventoryPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Inventory";
          },
        },
        {
          title: "Customer",
          icon: "mdi-account-multiple",
          to: {
            name: "CustomerPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Customer";
          },
        },
        {
          title: "Orders",
          icon: "mdi-room-service",
          to: {
            name: "OrdersPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Orders";
          },
        },
        {
          title: "Promotions",
          icon: "mdi-ticket",
          to: {
            name: "PromotionsPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Promotions";
          },
        },
        // {
        //   title: "divider",
        // },
        {
          title: "Profile",
          icon: "mdi-account",
          to: {
            name: "ProfilePage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Profile";
          },
        },
        {
          title: "Settings",
          icon: "mdi-cog",
          to: {
            name: "SettingsPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Settings";
          },
        },
      ],
    },

    // Snackbar store
    notifications: {
      model: false,
      text: "",
      color: "info",
      timeout: 3000,
    },
  }),

  actions: {
    /**
     * Sets the theme value and saves it to localStorage.
     *
     * @param {string} value - The theme value to set.
     */
    updateTheme(value) {
      console.log("Theme: " + this.theme.default);
      this.theme.default = value;
      localStorage.setItem("theme", this.theme.default);
    },

    setHeaderBarTitle(title) {
      this.headerBar.title = title;
      localStorage.setItem("headerBarTitle", title);
      console.log("Header Bar Title: " + this.headerBar.title);
    },

    setHeaderBarSubtitle(subtitle) {
      this.headerBar.subtitle = subtitle;
      localStorage.setItem("headerBarSubtitle", subtitle);
    },

    setNavigatorBarAvatar(path) {
      this.navigatorBar.avatar = path;
      localStorage.setItem("navigatorBarAvatar", path);
    },

    setNavigatorBarTitle(title) {
      this.navigatorBar.title = title;
      localStorage.setItem("navigatorBarTitle", title);
    },

    setNavigatorBarSubtitle(subtitle) {
      this.navigatorBar.subtitle = subtitle;
      localStorage.setItem("navigatorBarSubtitle", subtitle);
    },

    /**
     * Sets the drawer state for the navigator bar.
     *
     * @param {boolean} boolean - The new drawer state.
     */
    setNavigatorBarDrawer(boolean) {
      this.navigatorBar.drawer = boolean;
      localStorage.setItem("navigatorBarDrawer", JSON.stringify(boolean));
    },

    setNavigatorBarRail(boolean) {
      this.navigatorBar.rail = boolean;
    },

    // Snackbar notifications
    async showSnackbar(text, color, timeout) {
      this.notifications.model = true;
      this.notifications.text = text;
      this.notifications.color = color;
      this.notifications.timeout = timeout;

      setTimeout(() => {
        this.notifications.model = false;
      }, timeout);
      console.log("Snackbar: " + text + " " + color + " " + timeout);
    },
  },
});

// Kinda sucks that pinia dont have persist option
export const useCredentialsStore = defineStore("credentials", {
  state: () => ({
    username: localStorage.getItem("username") || "admin",
    password: "admin",
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false, // Retrieve isLoggedIn from localStorage or default to false
  }),

  actions: {
    async login(username, password) {
      try {
        // Check if provided username and password match stored credentials
        if (username === this.username && password === this.password) {
          // Update isLoggedIn state and store in localStorage
          this.isLoggedIn = true;
          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedIn", true);
          return true; // Return true if login successful
        } else {
          return false; // Return false if login failed
        }
      } catch (error) {
        console.log(error);
        return false; // Return false if an error occurs during login
      }
    },

    async logout() {
      try {
        // Update isLoggedIn state and remove from localStorage
        this.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const useProductStore = defineStore("products", {
  state: () => ({
    inventory: [],
    product: {},
  }),

  actions: {
    async getAllInventory() {
      try {
        const response = await api.get("public/inventory/");
        this.inventory = response.data;
        console.log("STORE getProducts | Response: ", response.data);
        return response.data;
      } catch (error) {
        console.log("STORE getProducts | ERROR: ", error);
        return error.response;
      }
    },

    async postItem(item) {
      try {
        const response = await api.post("public/inventory/", item);
        console.log("STORE postItem | Response: ", response.data);
        return response.data;
      } catch (error) {
        console.log("STORE postItem | ERROR: ", error);
        return error.response;
      }
    },

    async updateItem(item) {
      try {
        console.log("STORE updateItem | Item: ", item);

        const data = {
          product_id: item.product_id,
          product_name: item.product_name,
          image: item.image,
          description: item.description,
          price: parseFloat(item.price),
          stock_quantity: parseInt(item.stock_quantity),
          stock_threshold: parseInt(item.stock_threshold),
          category_id: item.category_id,
        };

        const response = await api.put(
          `public/inventory/${item.product_id}`,
          data
        );
        console.log("STORE updateItem | Response: ", response.data);
        return response.data;
      } catch (error) {
        console.log("STORE updateItem | ERROR: ", error);
        return error;
      }
    },
  },
});

export const useCustomerStore = defineStore("customers", {
  state: () => ({
    customers: [],
    totalCustomers: 0,
    customer: {},
    customer_id: null || localStorage.getItem("customer_id"),
  }),

  actions: {
    async getAllCustomers() {
      try {
        const response = await api.get("public/customers/");
        this.customers = response.data;
        console.log(
          "STORE getAllCustomers | Response: ",
          response.data,
          " Length: ",
          response.data.length
        );

        const res = {
          totalCustomers: response.data.length,
          customers: response.data,
        };

        return res;
      } catch (error) {
        console.log("STORE getAllCustomers | ERROR: ", error);
      }
    },

    setCustomer(customer_id) {
      this.customer_id = customer_id;
      localStorage.setItem("customer_id", customer_id);
      const res = {
        customer_id: customer_id,
      };

      return res;
    },

    async getCustomerDetails(customer_id) {
      try {
        if (!customer_id || customer_id === "" || customer_id === null) {
          customer_id = localStorage.getItem("customer_id");
        }

        console.log("STORE getCustomerDetails | Customer ID: ", customer_id);
        const response = await api.get(
          "public/customers/details/" + customer_id
        );
        this.customer = response.data;
        console.log("STORE getCustomerDetails | Response: ", response.data);
        return true;
      } catch (error) {
        console.log("STORE getCustomerDetails | ERROR: ", error);
      }
    },

    async addCustomer(item) {
      try {
        const response = await api.post("public/customers/register", item);
        this.customer = response.data;
        console.log("STORE addCustomer | Response: ", response.data);
        return true;
      } catch (error) {
        console.log("STORE addCustomer | ERROR: ", error);
      }
    },

    async updateCustomer(item) {
      try {
        const response = await api.put(
          `public/customers/${item.customer_id}`,
          item
        );
        this.customer = response.data;
        console.log("STORE updateCustomer | Response: ", response.data);
        return response.data;
      } catch (error) {
        console.log("STORE updateCustomer | ERROR: ", error);
      }
    },
  },
});
