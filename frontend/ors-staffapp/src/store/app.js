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
    theme: localStorage.getItem("theme") || "light",

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
          title: "Inventory",
          icon: "mdi-view-grid",
          to: {
            name: "InventoryPage",
          },
          onClick: () => {
            this.headerBar.title =
              localStorage.setItem("headerBarTitle") || "Inventory";
          },
        },
      ],
    },
  }),

  actions: {
    /**
     * Sets the theme value and saves it to localStorage.
     *
     * @param {string} value - The theme value to set.
     */
    toggleTheme(value) {
      this.theme = value;
      localStorage.setItem("theme", this.theme);
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
        console.log("API getProducts | Response: ", response.data);
        return response;
      } catch (error) {
        console.log("API getProducts | ERROR: ", error);
        return error.response;
      }
    },

    async postItem(item) {
      try {
        const response = await api.post("public/inventory/", item);
        console.log("API postItem | Response: ", response.data);
        return response;
      } catch (error) {
        console.log("API postItem | ERROR: ", error);
        return error.response;
      }
    },

    async updateItem(item) {
      try {
        console.log("API updateItem | Item: ", item);

        const response = await api.put(
          `public/inventory/${item.product_id}`,
          item
        );
        console.log("API updateItem | Response: ", response.data);
        return response;
      } catch (error) {
        console.log("API updateItem | ERROR: ", error);
        return error;
      }
    },
  },
});
