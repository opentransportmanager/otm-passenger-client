<template>
  <nav>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>OpenTransportManager</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn router :to="'/login'" v-if="!isLogged">
        <span>Login</span>
      </v-btn>
      <v-btn router :to="'/register'" v-if="!isLogged">
        <span>Register</span>
      </v-btn>
      <v-btn v-if="isLogged" @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
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
