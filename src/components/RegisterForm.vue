<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="text--primary primary" v-on="on" @click="clearErrors">
        <span class="d-none d-sm-flex ">Register</span>
        <v-icon class="d-sm-none">mdi-account-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card class="secondary">
      <v-card-title class="justify-center">
        <h2>Register</h2>
      </v-card-title>
      <v-card-text>
        <v-alert class="mt-4" v-if="serverErrors" type="error">
          <div v-for="(value, key) in serverErrors" :key="key">
            {{ value[0] }}
          </div>
        </v-alert>
        <v-form v-model="valid" @submit.prevent="register">
          <validation-provider
            rules="required|min:3|max:20"
            name="Name"
            v-slot="{ errors }"
          >
            <v-text-field
              type="string"
              label="Name"
              v-model="name"
              prepend-icon="mdi-account"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            rules="email|required"
            name="Email"
            v-slot="{ errors }"
          >
            <v-text-field
              type="email"
              label="Email"
              v-model="email"
              prepend-icon="mdi-account-circle"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            vid="confirmation"
            rules="min:8|required"
            name="Password"
            v-slot="{ errors }"
          >
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            rules="confirmPassword:confirmation"
            name="Repated password"
            v-slot="{ errors }"
          >
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="re_password"
              v-model="re_password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <v-btn class="primary" type="submit" :loading="loading"
            >Register</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      re_password: "",
      dialog: false,
      loading: false,
      showPassword: false,
      serverErrors: "",
      valid: false
    };
  },
  methods: {
    clearErrors() {
      this.serverErrors = "";
    },
    register() {
      if (this.valid) {
        this.loading = true;
        this.$authService
          .register(this.name, this.email, this.password)
          .then(() => {
            this.dialog = false;
            this.serverErrors = "";
            this.$authService.getSubscribes();
          })
          .catch(err => {
            this.serverErrors = Object.values(err.response.data);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
