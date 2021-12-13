<template>
  <v-app>
    <v-app-bar app absolute color="gray" elevate-on-scroll>
      <v-toolbar-title>Kennzeichen Deja Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <AddCar @update="fetchData"></AddCar>
    </v-app-bar>

    <v-main>
      <router-view :kfz="kfz" @update="fetchData" />
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
import axios from "axios";
import AddCar from "@/components/AddCar.vue";
export default {
  name: "App",
  data: () => ({
    serverAddress: process.env.VUE_APP_SERVER,
    kfz: [],
  }),
  methods: {
    async fetchData() {
      try {
        const { data } = await axios({
          url: `${process.env.VUE_APP_SERVER}/knzkfz`,
          method: "GET",
        });
        this.kfz = data.data;
        console.log(this.kfz);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchData();
  },
  components: {
    AddCar,
  },
};
</script>
