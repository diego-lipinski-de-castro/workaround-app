import "@/registerServiceWorker";
import Vue from "vue";
import { sync } from "vuex-router-sync";

import App from "@/App.vue";
import http from "@/http";
import router from "@/router";
import store from "@/store";

if (process.env.NODE_ENV === "production") {
  Vue.config.silent = true;
  Vue.config.devtools = false;
  Vue.config.productionTip = false;
} else {
  Vue.config.silent = false;
  Vue.config.devtools = true;
  Vue.config.productionTip = true;
}

sync(store, router, { moduleName: "router" });

Vue.prototype.$http = http;

Vue.prototype.$bus = new Vue();

new Vue({
  name: "root",
  store,
  router,
  render: h => h(App)
}).$mount("#app");
