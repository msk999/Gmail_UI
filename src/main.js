import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import ApiService from "./services/ApiService";
import TokenService from "./services/StorageService";
import ConfigService from "./services/ConfigService";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

ApiService.init(ConfigService.getBaseUrl());

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}
