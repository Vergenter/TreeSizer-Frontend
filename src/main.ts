import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { MdIcon, MdButton } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";

Vue.use(MdIcon);
Vue.use(MdButton);
// import vue-panzoom
import panZoom from "vue-panzoom";

Vue.use(panZoom);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
