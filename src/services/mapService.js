import axios from "axios";
import store from "../store";
export default {
  getDeparturesForBusline(stationId, buslineId) {
    return axios.get(`stations/${stationId}/paths/${buslineId}`).catch(() => {
      store.dispatch("showError");
    });
  },
  getBuslinesForStation(stationId) {
    return axios.get(`/stations/${stationId}/paths`).catch(() => {
      store.dispatch("showError");
    });
  },
  getBuslines() {
    return axios
      .get(`/buslines?sort=number`)
      .then(({ data }) => {
        store.dispatch("saveBuslines", data);
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  getStations() {
    return axios
      .get("/stations?sort=name")
      .then(({ data }) => {
        store.dispatch("saveStations", data);
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  getTimetableForStation(pathId) {
    return axios.get(`/paths/${pathId}/stations`).catch(() => {
      store.dispatch("showError");
    });
  }
};
