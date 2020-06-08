import axios from "axios";
import store from "../store";

export default {
  login: function(email, password) {
    return axios
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        store.dispatch("login", data);
      });
  },

  register: function(name, email, password) {
    return axios
      .post("/register", {
        name: name,
        email: email,
        password: password
      })
      .then(({ data }) => {
        store.dispatch("register", data);
      });
  },

  logout: function() {
    store.dispatch("logout");
  }
};
