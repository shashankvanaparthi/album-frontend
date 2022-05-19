<template>
  <v-container class="grey lighten-5">
    <v-row align="center" justify="center">
      <v-col md="6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>Login</v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              required
            ></v-text-field>

            <v-btn color="primary" @click="login"> Login </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
  }),

  methods: {
    login() {
        console.log("Login")
      // login logic
      // this.$refs.form.resetValidation()
    },
  },
};
</script>