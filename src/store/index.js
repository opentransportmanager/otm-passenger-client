import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    buslines: null,
    stations: null,
    subscribedBuslines: [],
    unsubscribedBuslines: []
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    clearUserData(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("subscribedBuslines");
      state.user = null;
    },
    saveBuslines(state, buslines) {
      state.buslines = buslines;
      localStorage.setItem("buslines", JSON.stringify(buslines));
    },
    saveStations(state, stations) {
      state.stations = stations;
    },
    saveSubscribes(state, subscriptions) {
      state.subscribedBuslines = subscriptions;
      localStorage.setItem("subscribedBuslines", JSON.stringify(subscriptions));
    },
    saveUnsubscribes(state, unsubscribes) {
      state.unsubscribedBuslines = unsubscribes;
      localStorage.setItem(
        "unsubscribedBuslines",
        JSON.stringify(unsubscribes)
      );
    },
    subscribeBusline(state, buslineId) {
      const busline = state.unsubscribedBuslines.find(busline => {
        return busline.id === buslineId;
      });
      state.unsubscribedBuslines.splice(
        state.unsubscribedBuslines.indexOf(busline),
        1
      );
      state.subscribedBuslines.push(busline);
    },
    unsubscribeBusline(state, buslineId) {
      const busline = state.subscribedBuslines.find(busline => {
        return busline.id === buslineId;
      });
      state.subscribedBuslines.splice(
        state.subscribedBuslines.indexOf(busline),
        1
      );
      state.unsubscribedBuslines.push(busline);
    },
    updateLocalStorage(state) {
      localStorage.setItem(
        "subscribedBuslines",
        JSON.stringify(state.subscribedBuslines)
      );
      localStorage.setItem(
        "unsubscribedBuslines",
        JSON.stringify(state.unsubscribedBuslines)
      );
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
    saveSubscribes({ commit }, data) {
      commit("saveSubscribes", data);
    },
    saveUnsubscribes({ commit }, data) {
      commit("saveUnsubscribes", data);
    },
    subscribeBusline({ commit }, buslineId) {
      setTimeout(() => {
        commit("subscribeBusline", buslineId);
        commit("updateLocalStorage");
      }, 125);
    },
    unsubscribeBusline({ commit }, buslineId) {
      setTimeout(() => {
        commit("unsubscribeBusline", buslineId);
        commit("updateLocalStorage");
      }, 125);
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
    },
    unsubscribedBuslines(state) {
      if (state.unsubscribedBuslines) return state.unsubscribedBuslines;
      return null;
    }
  }
});
