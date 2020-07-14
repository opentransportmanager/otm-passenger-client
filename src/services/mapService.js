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
      .get(`/buslines?sort=number&include=paths`)
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
  },

  getPathToDraw(pathId) {
    return axios.get(`paths/${pathId}/stations`).then(response => {
      const stations = response.data;
      const endStation = stations[stations.length - 1].position;
      const startStation = stations[0].position;
      const waypoints = [];
      for (let i = 1; i < stations.length - 1; i++) {
        waypoints[i - 1] = { location: stations[i].position, stopover: true };
      }
      return {
        startStation: startStation,
        endStation: endStation,
        waypoints: waypoints
      };
    });
  },

  drawRoute(
    directionsService,
    directionsDisplay,
    startStation,
    endStation,
    waypoints
  ) {
    directionsService.route(
      {
        origin: startStation,
        destination: endStation,
        waypoints: waypoints,
        travelMode: "WALKING"
      },
      function(response, status) {
        if (status === "OK") {
          directionsDisplay.setOptions({ suppressMarkers: true });
          directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
};
