<template>
  <v-app>
    <v-app-bar v-if="isLogged===false">
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
export default {
  name: "App",

  data() {
    return {
      isLogged: this.checkIfIsLogged(),
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
      this.isLogged = this.checkIfIsLogged();
      this.$router.push({ name: "home" });
    },

    checkIfIsLogged() {
      console.log("check");
      console.log(this.isLogged);
      let token = localStorage.token;
      if (token) {
        return true;
      } else {
        return false;
      }
    },
    created() {
      this.$on("logged", () => {
        console.log("Changed")
        this.isLogged = this.checkIfIsLogged();
      });
    },
  },
};
</script>

