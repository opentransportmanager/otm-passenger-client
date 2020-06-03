import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      state.token = userData.token;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    clearUserData() {
      localStorage.removeItem("user");
      location.reload();
    }
  },

  actions: {
    login({ commit }, credentials) {
      return axios.post("/login", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },

    register({ commit }, credentials) {
      return axios.post("/register", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },

    logout({ commit }) {
      commit("clearUserData");
    }
  },

  getters: {
    isLogged: state => !!state.user,
    token: state => state.token
  }
});
