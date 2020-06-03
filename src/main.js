import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "/api";

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const userData = JSON.parse(userDetails);
      this.$store.commit("setUserData", userData);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
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
