import axios from "axios";
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
    return axios.get(`/buslines`);
  },
  getStations: function() {
    return axios.get("/stations");
  }
};
