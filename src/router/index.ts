import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/views/Container/Main.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home/Home.vue"),
        children: [
          {
            path: "clock",
            component: () => import("@/components/home/BizMap.vue"),
            props: {
              akey: "3e3b601818fc3acf73b9f03317e150da",
            },
          },
          {
            path: "createForm/1",
            component: () => import("@/views/home/forms/Evection.vue"),
          },
          {
            path: "createForm/2",
            component: () => import("@/views/home/forms/Overtime.vue"),
          },
          {
            path: "createForm/3",
            component: () => import("@/views/home/forms/Send.vue"),
          },
          {
            path: "createForm/4",
            component: () => import("@/views/home/forms/Vacate.vue"),
          },
        ],
      },

      {
        path: "message",
        component: () => import("@/views/message/Message.vue"),
        redirect: "/message/unread",
        children: [
          {
            path: "unread",
            component: () => import("@/views/message/list/Unread.vue"),
          },
          {
            path: "all",
            component: () => import("@/views/message/list/All.vue"),
          },
          {
            path: "read",
            component: () => import("@/views/message/list/Read.vue"),
          },
          {
            path: "read/form",
            name: "detail",
            components: {
              detail: () => import("@/views/message/detail/Form.vue"),
            },
          },
        ],
      },
      {
        path: "user",
        component: () => import("@/views/user/Info.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
