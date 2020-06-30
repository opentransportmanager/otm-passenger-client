import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    buslines: null,
    stations: null,
    subscribedBuslines: []
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
    },
    subscribeBusline(state, buslineId) {
      const busline = state.buslines.find(busline => {
        return busline.id === buslineId;
      });
      state.subscribedBuslines.push(busline);
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
    },
    subscribeBusline({ commit }, buslineId) {
      setTimeout(() => {
        commit("subscribeBusline", buslineId);
      }, 250);
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
    },
    subscribedBuslines(state) {
      if (state.subscribedBuslines) return state.subscribedBuslines;
      return null;
    }
  }
});
