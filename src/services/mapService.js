import axios from "axios";
import store from "../store";
import _ from "lodash";
import { bus } from "../main.js";
export default {
  getDeparturesForBusline: function(stationId, buslineId) {
    return axios
      .get(`stations/${stationId}/paths/${buslineId}`)
      .then(response => {
        return (response.data = _.orderBy(response.data, "departure_time"));
      })
      .catch(() => {
        bus.$emit("errorCommunication");
      });
  },
  getBuslinesForStation: function(stationId) {
    return axios
      .get(`/stations/${stationId}/paths`)
      .then(response => {
        return (response.data = _.orderBy(response.data, "busline_number"));
      })
      .catch(() => {
        bus.$emit("errorCommunication");
      });
  },
  getBuslines: function() {
    return axios
      .get(`/buslines`)
      .then(({ data }) => {
        data = _.orderBy(data, "number");
        store.dispatch("saveBuslines", data);
      })
      .catch(() => {
        bus.$emit("errorCommunication");
      });
  },
  getStations: function() {
    return axios
      .get("/stations")
      .then(({ data }) => {
        data.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
        store.dispatch("saveStations", data);
      })
      .catch(() => {
        bus.$emit("errorCommunication");
      });
  },
  getTimetableForStation: function(pathId) {
    return axios.get(`/paths/${pathId}/stations`).catch(() => {
      bus.$emit("errorCommunication");
    });
  }
};
