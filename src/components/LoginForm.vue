<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="#FFBF69" class="ma-2" v-on="on">
        <span class="d-none d-sm-flex">login</span>
        <v-icon small class="d-sm-none">mdi-login</v-icon>
      </v-btn>
    </template>

    <v-card color="#FFBF69">
      <v-card-title class="justify-center">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            type="email"
            label="email"
            v-model="email"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="password"
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
          <v-btn color="#FF9F1C" type="submit" :loading="loading">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      dialog: false,
      loading: false,
      showPassword: false
    };
  },

  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .finally(() => {
          this.loading = false;
          this.dialog = false;
        });
    }
  }
};
</script>
