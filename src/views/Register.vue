<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <div>
        <h1>Register</h1>
        <v-form @submit.prevent="register">
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
          <v-btn type="submit">Register</v-btn>
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
    register() {
      this.$store
        .dispatch("register", {
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
