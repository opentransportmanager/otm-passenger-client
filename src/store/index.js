import Vue from "vue";
import Vuex from "vuex";

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
    login({ commit }, data) {
      commit("setUserData", data);
    },

    register({ commit }, data) {
      commit("setUserData", data);
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
