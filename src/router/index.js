import HomeView from "../views/HomeView.vue";
import BlogView from "../views/BlogView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/blog/:id",
    name: "blog",
    component: BlogView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
