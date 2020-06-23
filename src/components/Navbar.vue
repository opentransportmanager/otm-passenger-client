<template>
  <nav>
    <v-app-bar app color="#CBF3F0">
      <v-toolbar-title class="text-uppercase grey--text">
        <router-link
          to="/"
          tag="span"
          class="d-none d-md-flex"
          style="cursor: pointer"
        >
          OpenTransportManager
        </router-link>
        <router-link
          to="/"
          tag="span"
          class="d-none d-sm-flex d-md-none mr-6"
          style="cursor: pointer"
        >
          OTM
        </router-link>
      </v-toolbar-title>

      <search-input style="max-width: 300px" />

      <v-btn
        v-for="link in links"
        :key="link.text"
        v-if="(!link.reqLog && !isLogged) || (link.reqLog && isLogged)"
        :to="link.route"
        text
        class="ma-2 hidden-md-and-down"
      >
        {{ link.text }}
      </v-btn>

      <v-spacer></v-spacer>

      <LoginForm v-if="!isLogged" />
      <RegisterForm v-if="!isLogged" />
      <v-btn v-if="isLogged" @click="logout">
        <span class="d-none d-sm-flex">Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="sideNav = !sideNav"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      app
      temporary
      v-model="sideNav"
      right
      color="orange lighten-1"
    >
      <v-btn block text class="justify center" @click="sideNav = !sideNav">
        <v-icon right>mdi-redo</v-icon>
      </v-btn>
      <v-list>
        <v-list-item
          v-for="link in links"
          v-if="(!link.reqLog && !isLogged) || (link.reqLog && isLogged)"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--<v-footer
      height="40px"
      :class="[{ 'd-none': $vuetify.breakpoint.smAndDown }]"
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
    </v-footer>-->
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
      sideNav: false,
      links: [
        { icon: "", text: "Link1", route: "/", reqLog: false },
        { icon: "", text: "About", route: "/about", reqLog: false },
        { icon: "", text: "Link3", route: "/", reqLog: true },
        { icon: "", text: "Link4", route: "/", reqLog: false }
      ]
    };
  },
  components: { SearchInput, RegisterForm, LoginForm },
  computed: {
    ...mapGetters(["isLogged"])
  },
  methods: {
    logout() {
      this.$authService.logout();
    }
  }
};
</script>

<style scoped></style>
