import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Design from "../views/Design.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    component: Design
  },
  {
    path: "/:hash",
    component: Design,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
