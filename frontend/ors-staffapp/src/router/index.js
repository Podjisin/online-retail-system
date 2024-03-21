// Composables
import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/pages/DashboardPage.vue";
import ProfilePage from "@/views/pages/ProfilePage.vue";

import ErrorPage from "@/views/ErrorPage.vue";

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
        meta: { breadcrumb: "Dashboard", disabled: false },
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: ProfilePage,
        meta: { breadcrumb: "Profile", disabled: false },
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
