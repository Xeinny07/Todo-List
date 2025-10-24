import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import ErrorTest from "../views/ErrorTest.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/error-test", name: "ErrorTest", component: ErrorTest },
  { path: "/:pathMatch(.)", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;