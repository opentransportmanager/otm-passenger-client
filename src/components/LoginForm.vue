<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="ma-2 secondary text--primary"
        v-on="on"
        @click="clearErrors"
      >
        <span class="d-none d-sm-flex">login</span>
        <v-icon small class="d-sm-none">mdi-login</v-icon>
      </v-btn>
    </template>
    <v-card class="secondary">
      <v-card-title class="justify-center">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="serverError" type="error" class="mt-4 justify-center">
          {{ serverError }}
        </v-alert>
        <v-form v-model="valid" @submit.prevent="login">
          <validation-provider
            rules="email|required"
            name="Email"
            v-slot="{ errors }"
          >
            <v-text-field
              type="email"
              label="E-mail"
              v-model="email"
              prepend-icon="mdi-account-circle"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            rules="required"
            name="Password"
            v-slot="{ errors }"
          >
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <v-btn class="primary" type="submit" :loading="loading">Login</v-btn>
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
      valid: false,
      email: "",
      password: "",
      dialog: false,
      loading: false,
      showPassword: false,
      serverError: ""
    };
  },
  methods: {
    clearErrors() {
      this.serverError = "";
    },
    login() {
      if (this.valid) {
        this.loading = true;
        this.$authService
          .login(this.email, this.password)
          .then(() => {
            this.dialog = false;
            this.serverError = "";
            this.$subscriptionService.getSubscribes();
          })
          .catch(err => {
            this.serverError = err.response.data.toString();
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
