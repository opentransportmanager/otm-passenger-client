import axios from "axios";
import store from "../store";
import _ from "lodash";
export default {
  getDeparturesForBusline: function(stationId, buslineId) {
    return axios
      .get(`stations/${stationId}/paths/${buslineId}`)
      .then(response => {
        return (response.data = _.orderBy(response.data, "departure_time"));
      });
  },
  getBuslinesForStation: function(stationId) {
    return axios.get(`/stations/${stationId}/paths`).then(response => {
      return (response.data = _.orderBy(response.data, "busline_number"));
    });
  },
  getBuslines: function() {
    return axios.get(`/buslines`).then(({ data }) => {
      store.dispatch("saveBuslines", data);
    });
  },
  getStations: function() {
    return axios.get("/stations").then(({ data }) => {
      store.dispatch("saveStations", data);
    });
  },
  getTimetableForStation: function(pathId) {
    return axios.get(`/paths/${pathId}/stations`);
  }
};
