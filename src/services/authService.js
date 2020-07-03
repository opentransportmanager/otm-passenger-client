import axios from "axios";
import store from "../store";

export default {
  login: function(email, password) {
    return axios
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        store.dispatch("login", data);
      });
  },

  register: function(name, email, password) {
    return axios
      .post("/register", {
        name: name,
        email: email,
        password: password
      })
      .then(({ data }) => {
        store.dispatch("register", data);
      });
  },

  logout: function() {
    store.dispatch("logout");
  },

  getSubscribes: function() {
    if (store.getters.isLogged === true) {
      return axios.get("/buslines/user/subscriptions").then(({ data }) => {
        console.log(data);
        store.dispatch("saveSubscribes", data);
        this.getUnsubscribes();
      });
    }
  },
  getUnsubscribes: function() {
    const subscribedBuslines = store.getters.subscribedBuslines;
    const buslines = store.getters.buslines;
    const unsubscribedBuslines = buslines.filter(
      this.compareBuslineArrays(subscribedBuslines)
    );
    store.dispatch("saveUnsubscribes", unsubscribedBuslines);
  },

  subscribeBusline: function(buslineId) {
    return axios
      .post("/buslines/subscribe", {
        busline_id: buslineId
      })
      .then(() => {
        store.dispatch("subscribeBusline", buslineId);
      });
  },
  unsubscribeBusline: function(buslineId) {
    return axios
      .delete("/buslines/unsubscribe", {
        data: {
          busline_id: buslineId
        }
      })
      .then(() => {
        store.dispatch("unsubscribeBusline", buslineId);
      });
  },

  compareBuslineArrays: function(otherArray) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other.id == current.id && other.number == current.number;
        }).length == 0
      );
    };
  }
};
