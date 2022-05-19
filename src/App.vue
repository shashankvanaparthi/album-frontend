<template>
  <h1>Hello</h1>
  <v-app>
    <v-app-bar>
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

  data: () => ({}),
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
  },
};
</script>

