<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="#FF9F1C" v-on="on">
        <span class="d-none d-sm-flex ">Register</span>
        <v-icon class="d-sm-none">mdi-account-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card color="#FFBF69">
      <v-card-title>
        <h2>Register</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
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
          <v-btn color="#FF9F1C" type="submit" :loading="loading"
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
      email: "",
      password: "",
      dialog: false,
      loading: false,
      showPassword: false
    };
  },

  methods: {
    register() {
      this.$store
        .dispatch("register", {
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
