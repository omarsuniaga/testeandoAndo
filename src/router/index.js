import { createRouter, createWebHistory } from "vue-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import About from "../views/About.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";
// @ts-ignore
import Login from "../views/Login.vue";

const auth = getAuth();
let uid = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
  } else {
    console.log("Debe logearse");
  }
});
const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const autorizacion = to.matched.some((records) => records.meta.requiresAuth);
  if (autorizacion && !uid) next("/dashboard");
  else next();
});

export default router;
