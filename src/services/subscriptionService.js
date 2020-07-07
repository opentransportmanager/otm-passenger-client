import axios from "axios";
import store from "../store";
import { bus } from "../main";

export default {
  getSubscribes: function() {
    if (store.getters.isLogged === true) {
      return axios
        .get("/buslines/user/subscriptions")
        .then(({ data }) => {
          store.dispatch("saveSubscribes", data);
          this.getUnsubscribes();
        })
        .catch(() => {
          bus.$emit("errorCommunication");
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
      })
      .catch(() => {
        bus.$emit("errorCommunication");
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
      })
      .catch(() => {
        bus.$emit("errorCommunication");
      });
  },

  compareBuslineArrays: function(otherArray) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other.id === current.id && other.number === current.number;
        }).length === 0
      );
    };
  }
};
