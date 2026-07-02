import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "home", component: () => import("@/features/home/views/HomePage.vue") },
      { path: "requests", name: "requests", component: () => import("@/features/requests/views/RequestsPage.vue") },
      {
        path: "requests/:id",
        name: "request-detail",
        component: () => import("@/features/requests/views/RequestDetailPage.vue")
      },
      { path: "kp", name: "kp", component: () => import("@/features/kp/views/KpPage.vue") },
      { path: "kp/:id", name: "kp-card", component: () => import("@/features/kp/views/KpCardPage.vue") },
      { path: "orders", name: "orders", component: () => import("@/features/orders/views/OrdersPage.vue") },
      { path: "docs", name: "docs", component: () => import("@/features/docs/views/DocsPage.vue") },
      { path: "chat", name: "chat", component: () => import("@/features/chat/views/ChatPage.vue") },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("@/features/notifications/views/NotificationsPage.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/features/profile/views/ProfilePage.vue")
      },
      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/features/not-found/views/NotFoundPage.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
