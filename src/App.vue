<template>
  <v-app>
    <v-app-bar v-if="isLogged === false">
      <v-app-bar-title>
        <v-btn variant="text" @click="goHome"> Album </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="goLogin"> Login </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn variant="text" @click="goSignup"> Signup </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar v-else>
      <v-app-bar-title>
        <v-btn variant="text" @click="goHome"> Album </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="goCreate"> Create </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn variant="text" @click="signOut"> LogOut </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {isUsersLogged} from "./services/UserAuthenticationService"
export default {
  name: "App",

  data() {
    return {
      isLogged: isUsersLogged(),
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    },
    goSignup() {
      this.$router.push({ name: "signup" });
    },
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.isLogged = isUsersLogged();
      this.$router.push({ name: "home" });
    },

    goCreate() {
      this.$router.push({ name: "create" });
    },

    // checkIfIsLogged() {
    //   console.log(this.isLogged);
    //   let token = localStorage.token;
    //   if (token) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
  mounted() {
    console.log("App.vue mounted")
    this.emitter.on("logged", (args) => {
      console.log("Changed");
      console.log(args);
      this.isLogged = isUsersLogged();
    });
  },
};
</script>

