<template>
  <nav>
    <v-app-bar app color="#CBF3F0">
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="d-none d-md-flex">OpenTransportManager</span>
        <span class="d-none d-sm-flex d-md-none mr-6">OTM</span>
      </v-toolbar-title>

      <search-input style="max-width: 300px" />
      <v-spacer></v-spacer>

      <LoginForm v-if="!isLogged" />
      <RegisterForm v-if="!isLogged" />
      <v-btn v-if="isLogged" @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-footer
      height="40px"
      :class="['', { 'd-none': $vuetify.breakpoint.smAndDown }]"
      absolute
      padless
    >
      <v-card
        tile
        height="100%"
        width="100%"
        class="text-center "
        color="#CBF3F0"
      >
        <v-card-text class="ma-0 pb-0 pt-2">
          {{ new Date().getFullYear() }} — <strong>OpenTransportManager</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </nav>
</template>

<script>
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { mapGetters } from "vuex";
import SearchInput from "./SearchInput";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: true
    };
  },
  components: { SearchInput, RegisterForm, LoginForm },
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
