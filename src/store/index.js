import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    clearUserData(state) {
      localStorage.removeItem("user");
      state.user = null;
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
    token(state) {
      if (state.user) {
        return state.user.token;
      }
      return false;
    }
  }
});
