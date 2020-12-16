import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Design from "../views/Design.vue"
import Index from "../views/Index.vue"
import Creator from "../views/Creator.vue"
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: "Design",
    component: Design
  },
  {
    path: "/design",
    name: "Design",
    component: Design
  },
  {
    path: "/design/:tree",
    name: "Index",
    component: Index
  },
  {
    path: "/design/:tree/:ruleset",
    name: "Design",
    component: Design
  },
  // {
  //   path: "/design//:ruleset",
  //   name: "Design",
  //   component: Design
  // },
  // {
  //   path: "/design/:ruleset/:skilltree",
  //   name: "Design",
  //   component: Design
  // },
  // {
  //   path: "/index",
  //   name: "Index",
  //   component: Index
  // },
  // {
  //   path: "/index/:id",
  //   name: "Index",
  //   component: Index
  // },
  // {
  //   path: "/creator/:id",
  //   name: "Creator",
  //   component: Creator
  // },
  // {
  //   path: "/creator/:id",
  //   name: "Design",
  //   component: Design
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
