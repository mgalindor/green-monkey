<template>
  <v-app>
    <v-app-bar app color="green" class="white--text">
      <v-toolbar-title>
        <v-icon class="white--text">mdi-account-check</v-icon>
        Green Monkey</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
