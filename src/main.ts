import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import vue-panzoom
import panZoom from "vue-panzoom";

Vue.use(panZoom);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
