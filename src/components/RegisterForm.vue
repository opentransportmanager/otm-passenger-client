<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="#FF9F1C" v-on="on">
        <span class="d-none d-sm-flex ">Register</span>
        <v-icon class="d-sm-none">mdi-account-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card color="#FFBF69">
      <v-card-title class="justify-center">
        <h2>Register</h2>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="serverError" type="error" class="mt-4 justify-center">
          {{ serverError }}
        </v-alert>

        <v-form @submit.prevent="register">
          <v-text-field
            type="string"
            label="Name"
            v-model="name"
            prepend-icon="mdi-account"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            type="email"
            label="Email"
            v-model="email"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="password"
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="re_password"
            v-model="re_password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
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
      name: "",
      email: "",
      password: "",
      re_password: "",
      dialog: false,
      loading: false,
      showPassword: false,
      serverError: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "This is not correct e-mail"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length > 8 || "Password need to have at least 8 letters",
        v => this.password === v || "Passwords need to be the same"
      ],
      nameRules: [
        v => v.length > 3 || "Name is to short",
        v => v.length < 20 || "Name is to long"
      ]
    };
  },

  methods: {
    clearErrors() {
      this.serverError = "";
    },
    register() {
      if (this.valid) {
        this.$store
          .dispatch("register", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.dialog = false;
            this.serverError = "";
          })
          .catch(err => {
            console.log(err);
            this.serverError = "to do";
          })
          .finally(() => {
            this.loading = false;
            this.dialog = false;
          });
      }
    }
  }
};
</script>
