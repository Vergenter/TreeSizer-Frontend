import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Design from "../views/Design.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: "Design",
    component: Design
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
