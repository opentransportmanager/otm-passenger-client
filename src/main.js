import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { ValidationProvider, setInteractionMode } from "vee-validate";
import "./components/validationRules";
import authService from "./services/authService";
import subscriptionService from "./services/subscriptionService";

export const bus = new Vue();
Vue.prototype.$authService = authService;
Vue.prototype.$subscriptionService = subscriptionService;

Vue.component("ValidationProvider", ValidationProvider);
setInteractionMode("eager");

Vue.config.productionTip = false;
axios.defaults.baseURL = "/api";

new Vue({
  router,
  store,
  vuetify,
  created() {
    const buslines = localStorage.getItem("buslines");
    if (buslines) {
      const buslinesData = JSON.parse(buslines);
      this.$store.commit("saveBuslines", buslinesData);
    }
    const userDetails = localStorage.getItem("user");
    const subscribedBuslines = localStorage.getItem("subscribedBuslines");
    const unsubscribedBuslines = localStorage.getItem("unsubscribedBuslines");
    if (userDetails) {
      const userData = JSON.parse(userDetails);
      const subscribesData = JSON.parse(subscribedBuslines);
      const unsubscribesData = JSON.parse(unsubscribedBuslines);
      this.$store.commit("setUserData", userData);
      this.$store.commit("saveSubscribes", subscribesData);
      this.$store.commit("saveUnsubscribes", unsubscribesData);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
    axios.interceptors.request.use(
      config => {
        const token = store.getters.token;
        if (token) {
          config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
