import axios from "axios";
import store from "../store";
import { bus } from "../main";

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
          bus.$emit("errorCommunication");
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
        bus.$emit("errorCommunication");
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
        bus.$emit("errorCommunication");
      });
  }
};
