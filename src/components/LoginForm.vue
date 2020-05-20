<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="success" v-on="on">Login</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            type="email"
            label="email"
            v-model="email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            label="password"
            v-model="password"
            required
          ></v-text-field>
          <v-btn type="submit" :loading="loading">Login</v-btn>
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
      loading: false
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
