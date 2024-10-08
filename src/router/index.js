import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/DashboardView.vue";
import Dataset from "../views/DatasetView.vue";
import Research from "../views/ResearchView.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/dataset",
    name: "Dataset",
    component: Dataset,
  },
  {
    path: "/research",
    name: "Research",
    component: Research,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
