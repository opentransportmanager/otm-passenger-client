<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="#FF9F1C" v-on="on" @click="clearErrors">
        <span class="d-none d-sm-flex ">Register</span>
        <v-icon class="d-sm-none">mdi-account-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card color="#FFBF69">
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
      serverErrors: "",
      valid: false,
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
      this.serverErrors = "";
    },
    register() {
      if (this.valid) {
        this.loading = true;
        this.$store
          .dispatch("register", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.dialog = false;
            this.serverErrors = "";
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
