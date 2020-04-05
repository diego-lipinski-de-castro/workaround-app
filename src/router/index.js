import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import notFound from "@/views/404";
import error from "@/views/error";
import loadingOverlay from "@/views/loading-overlay";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: process.env.NODE_ENV !== "production" ? "hash" : "history",
  // base: "",
  scrollBehavior: () => {
    0;
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => lazyload("views.home"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => lazyload("views.profile"),
      meta: {
        authenticated: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => lazyload("views.login"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => lazyload("views.register"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/404",
      name: "404",
      component: notFound,
    },
    {
      path: "*",
      redirect: {
        name: "404",
      },
    },
  ],
});

// TODO: fix this method
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.authenticated)) {
    if (!store.getters["auth/loggedIn"]) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((route) => route.meta.guest)) {
    if (store.getters["auth/loggedIn"]) {
      next({
        name: "home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const lazyload = (path) => {
  path = path.replace(/\./g, "/");

  const component = () => ({
    component: import(`./../${path}`),
    loading: loadingOverlay,
    error: error,
    delay: 600,
    timeout: 10000,
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(component, data, children);
    },
  });
};

export default router;
