// Composables
import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/pages/DashboardPage.vue";
import ProfilePage from "@/views/pages/ProfilePage.vue";
import InventoryPage from "@/views/pages/InventoryPage.vue";
import CustomerPage from "@/views/pages/CustomerPage.vue";
import CustomerDetailPage from "@/views/pages/CustomerDetailPage.vue";
// import CustomerOrderDetailPage from "@/views/pages/CustomerOrderDetailPage.vue";
import OrdersPage from "@/views/pages/OrdersPage.vue";
import PromotionsPage from "@/views/pages/PromotionsPage.vue";

import SettingsPage from "@/views/pages/SettingsPage.vue";

import ErrorPage from "@/views/ErrorPage.vue";

/**
 * Defines the routes for the Vue router.
 * Includes routes for login, home, dashboard, profile,
 * 404 error handling, and etc.
 */
const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "HomePage",

    component: HomePage,
    meta: { breadcrumb: "Home", disabled: true },
    children: [
      {
        path: "dashboard",
        name: "DashboardPage",
        component: DashboardPage,
        meta: {
          breadcrumb: "Dashboard",
          disabled: false,
          includeToSearch: true,
        },
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: ProfilePage,
        meta: { breadcrumb: "Profile", disabled: false, includeToSearch: true },
      },
      {
        path: "inventory",
        name: "InventoryPage",
        component: InventoryPage,
        meta: {
          breadcrumb: "Inventory",
          disabled: false,
          includeToSearch: true,
        },
      },
      {
        path: "customer",
        name: "CustomerPage",
        component: CustomerPage,
        meta: {
          breadcrumb: "Customer",
          disabled: false,
          includeToSearch: true,
        },
        // children: [
        //   {
        //     path: ":id",
        //     name: "CustomerDetailPage",
        //     component: CustomerDetailPage,
        //     meta: {
        //       breadcrumb: "Customer Detail",
        //       disabled: false,
        //       includeToSearch: false,
        //     },
        //   },
        // ],
      },
      {
        path: "customer-detail/:id",
        name: "CustomerDetailPage",
        component: CustomerDetailPage,
        meta: {
          breadcrumb: "Customer Detail",
          disabled: false,
          includeToSearch: false,
        },
      },
      // {
      //   path: "customer-order-detail/:id",
      //   name: "CustomerOrderDetailPage",
      //   component: CustomerOrderDetailPage,
      //   meta: {
      //     breadcrumb: "Customer Order Detail",
      //     disabled: false,
      //     includeToSearch: false,
      //   },
      // },
      {
        path: "orders",
        name: "OrdersPage",
        component: OrdersPage,
        meta: {
          breadcrumb: "Orders",
          disabled: false,
          includeToSearch: false,
        },
      },
      {
        path: "promotions",
        name: "PromotionsPage",
        component: PromotionsPage,
        meta: {
          breadcrumb: "Promotions",
          disabled: false,
          includeToSearch: false,
        },
      },
      {
        path: "settings",
        name: "SettingsPage",
        component: SettingsPage,
        meta: {
          breadcrumb: "Settings",
          disabled: false,
          includeToSearch: true,
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
