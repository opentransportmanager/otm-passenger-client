<template>
  <nav>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>OpenTransportManager</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <LoginForm v-if="!isLogged" />
      <RegisterForm v-if="!isLogged" />
      <v-btn v-if="isLogged" @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  components: { RegisterForm, LoginForm },
  computed: {
    ...mapGetters(["isLogged"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped></style>
