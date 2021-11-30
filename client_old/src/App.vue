<template>
  <v-app>
    <v-app-bar app absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-toolbar-title>Kennzeichen Deja Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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
