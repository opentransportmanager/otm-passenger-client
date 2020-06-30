import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/userPanel",
    name: "UserPanel",
    component: () => import("../views/UserPanel")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next("/");
  } else if (
    to.matched.some(record => record.meta.requiresVisitor) &&
    loggedIn
  ) {
    next("/");
  } else next();
});

export default router;
