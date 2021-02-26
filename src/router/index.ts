import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: Tabs,
    children: [
      {
        path: "home",
        component: () => import("@/views/Tab1.vue"),
        children: [
          {
            path: "clock",
            component: import("@/components/home/BizMap.vue"),
            props: {
              akey: "3e3b601818fc3acf73b9f03317e150da",
            },
          },
        ],
      },
      {
        path: "message",
        component: () => import("@/views/Tab2.vue"),
      },
      {
        path: "user",
        component: () => import("@/views/Tab3.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
