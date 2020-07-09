import axios from "axios";
import store from "../store";

export default {
  login(email, password) {
    return axios
      .post("/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        store.dispatch("login", data);
      });
  },

  register(name, email, password) {
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

  logout() {
    store.dispatch("logout");
  }
};
