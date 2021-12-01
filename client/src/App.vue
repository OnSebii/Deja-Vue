<template>
  <v-app>
    <v-app-bar app absolute color="gray" elevate-on-scroll>
      <v-toolbar-title>Kennzeichen Deja Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer absolute fixed padless>
      <v-card flat tile width="100%" class="blue accent-2 text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Baily.at</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
