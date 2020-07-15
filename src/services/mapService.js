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
      const endStation = stations.pop().position;
      const startStation = stations.shift().position;
      stations.forEach(
        (station, index) =>
          (stations[index] = { location: station.position, stopover: true })
      );
      return {
        startStation: startStation,
        endStation: endStation,
        waypoints: stations
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
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setOptions({ suppressMarkers: true });
          directionsDisplay.setDirections(response);
        } else {
          window.alert(
            "Directions request failed, try again later. " +
              "If the problem repeats feel free contact with us"
          );
        }
      }
    );
  },
  getMovingBuses() {
    return axios.get("https://localhost:5001/states");
  }
};
