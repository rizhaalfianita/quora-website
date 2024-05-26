import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/DashboardView.vue";
import Dataset from "../views/DatasetView.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
