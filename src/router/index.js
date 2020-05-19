import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresVisitor: true
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresVisitor: true
    },
    component: () => import("../views/Register.vue")
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
    next("/login");
  } else if (
    to.matched.some(record => record.meta.requiresVisitor) &&
    loggedIn
  ) {
    next("/home");
  } else next();
});

export default router;
