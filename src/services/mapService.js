import axios from "axios";
import store from "../store";
import _ from "lodash";
export default {
  getDeparturesForBusline(stationId, buslineId) {
    return axios
      .get(`stations/${stationId}/paths/${buslineId}`)
      .then(response => {
        return (response.data = _.orderBy(response.data, "departure_time"));
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  getBuslinesForStation(stationId) {
    return axios
      .get(`/stations/${stationId}/paths`)
      .then(response => {
        return (response.data = _.orderBy(response.data, "busline_number"));
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  getBuslines() {
    return axios
      .get(`/buslines`)
      .then(({ data }) => {
        data = _.orderBy(data, "number");
        store.dispatch("saveBuslines", data);
      })
      .catch(() => {
        store.dispatch("showError");
      });
  },
  getStations() {
    return axios
      .get("/stations")
      .then(({ data }) => {
        data.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
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
