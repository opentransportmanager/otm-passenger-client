<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <div>
        <h1>Login</h1>
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
          <v-btn type="submit">Login</v-btn>
        </v-form>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
