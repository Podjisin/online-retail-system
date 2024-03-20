// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    headerBar: {
      title: localStorage.getItem("headerBarTitle") || "Dashboard",
      subtitle: localStorage.getItem("headerBarSubtitle") || "",
    },

    navigatorBar: {
      avatar: localStorage.getItem("navigatorBarAvatar") || null,
      title: localStorage.getItem("navigatorBarTitle") || null,
      subtitle: localStorage.getItem("navigatorBarSubtitle") || null,

      drawer: false,
      rail: false,

      indexFocus: 0,

      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: {
            name: "DashboardPage",
          },
          onClick: async () => {
            console.log("Dashboard clicked");
            const appStore = useAppStore();
            appStore.setHeaderBarTitle("Dashboard");
          },
        },
        // {
        //   title: "Profile",
        //   icon: "mdi-account",
        //   to: {
        //     name: "ProfilePage",
        //   },
        //   onClick: () => {
        //     const appStore = useAppStore();
        //     appStore.setHeaderBarTitle("Profile");
        //   },
        // },
        // {
        //   title: "Settings",
        //   icon: "mdi-cog",
        //   to: {
        //     name: "SettingsPage",
        //   },
        //   onClick: () => {
        //     const appStore = useAppStore();
        //     appStore.setHeaderBarTitle("Settings");
        //   },
        // },
        // {
        //   title: "About",
        //   icon: "mdi-help",
        //   to: {
        //     name: "AboutPage",
        //   },
        //   onClick: () => {
        //     const appStore = useAppStore();
        //     appStore.setHeaderBarTitle("About");
        //   },
        // },
      ],
    },
  }),

  actions: {
    setHeaderBarTitle(title) {
      this.headerBar.title = title;
      localStorage.setItem("headerBarTitle", title);
      console.log("Header Bar Title: " + title);
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

    setNavigatorBarDrawer(boolean) {
      this.navigatorBar.drawer = boolean;
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
