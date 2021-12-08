import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/fire.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    alias: ["/landing"],
    name: "landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth) {
    auth.onAuthStateChanged((user) => {
      if (!user) next("/");
      else next();
    });
  } else {
    next();
  }
});

export default router;
