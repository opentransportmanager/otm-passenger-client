import axios from "axios";
import store from "../store";

export function login(email, password) {
  return axios
    .post("/login", {
      email: email,
      password: password
    })
    .then(({ data }) => {
      store.dispatch("login", data);
    });
}

export function register(name, email, password) {
  return axios
    .post("/register", {
      name: name,
      email: email,
      password: password
    })
    .then(({ data }) => {
      store.dispatch("register", data);
    });
}

export function logout() {
  store.dispatch("logout");
}

export default {
  login,
  logout,
  register
};
