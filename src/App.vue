<template>
  <v-app>
    <v-app-bar app color="green" class="white--text">
      <v-toolbar-title>Green Monkey</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="orange" v-if="!authenticated" @click="logout"
        >Sign Out</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "@/fire.js";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    authenticated() {
      var user = auth.currentUser;
      return user ? true : false;
    },
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace("/");
      });
    },
  },
};
</script>
