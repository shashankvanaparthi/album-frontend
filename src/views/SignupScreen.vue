<template>
  <!-- <v-container class="grey lighten-5">
    <v-row align="center" justify="center">
      <v-col md="6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>Signup</v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" label="Name" required></v-text-field>

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

            <v-btn color="primary" @click="signup"> Signup </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->

  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col md="6">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Signup form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="user.name"
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.email"
                  name="email"
                  label="Email"
                  type="text"
                  placeholder="Email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="password"
                  required
                ></v-text-field>
                <v-btn
                  @click="signup"
                  class="mt-4"
                  color="primary"
                  value="log in"
                  >Signup</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDataService from "../services/UserDataService";
import { isValidPassword, isValidEmail } from "../services/ValidationService";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signup() {
      const { user } = this;

      if (user.name == "") {
        alert("UserName must not be empty");
        return;
      }

      if (isValidEmail(user.email)) {
        alert("Email is Not Valid");
        return;
      }

      const passwordErrors = isValidPassword(user.password);

      if (passwordErrors.length > 0) {
        alert(passwordErrors.join("\n"));
        return;
      }

      UserDataService.signup(user).then(
        (response) => {
          console.log(response);
          this.$router.push({ name: "login" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>