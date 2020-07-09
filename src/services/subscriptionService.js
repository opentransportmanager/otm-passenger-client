import axios from "axios";
import store from "../store";

export default {
  getSubscribes() {
    if (store.getters.isLogged === true) {
      return axios
        .get("/buslines/user/subscriptions")
        .then(({ data }) => {
          store.dispatch("saveSubscribes", data);
          this.getUnsubscribes();
        })
        .catch(() => {
          store.dispatch("showError");
        });
    }
  },
  getUnsubscribes() {
    const subscribedBuslines = store.getters.subscribedBuslines;
    const buslines = store.getters.buslines;
    const unsubscribedBuslines = buslines.filter(
      ({ number: num1 }) =>
        !subscribedBuslines.some(({ number: num2 }) => num1 === num2)
    );
    store.dispatch("saveUnsubscribes", unsubscribedBuslines);
  },

  subscribeBusline(buslineId) {
    return axios
      .post("/buslines/subscribe", {
        busline_id: buslineId
      })
      .then(() => {
        store.dispatch("subscribeBusline", buslineId);
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  unsubscribeBusline(buslineId) {
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
        store.dispatch("showError");
      });
  }
};
