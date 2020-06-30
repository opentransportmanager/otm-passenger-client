import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    buslines: null,
    stations: null
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    clearUserData(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
    saveBuslines(state, buslines) {
      state.buslines = buslines;
    },
    saveStations(state, stations) {
      state.stations = stations;
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
    },
    saveBuslines({ commit }, data) {
      commit("saveBuslines", data);
    },
    saveStations({ commit }, data) {
      commit("saveStations", data);
    }
  },

  getters: {
    isLogged: state => !!state.user,
    token(state) {
      if (state.user) {
        return state.user.token;
      }
      return false;
    },
    buslines(state) {
      if (state.buslines) return state.buslines;
      return null;
    },
    stations(state) {
      if (state.stations) return state.stations;
      return null;
    }
  }
});
