<template>
  <div>
    <CardView :kfz="kfz" @del="delCar($event)" @update="$emit('update')"></CardView>
  </div>
</template>

<script>
import axios from "axios";
import CardView from "@/components/CardView.vue";

export default {
  name: "Home",
  data: () => ({
    serverAddress: process.env.VUE_APP_SERVER,
  }),
  methods: {
    // async fetchData() {
    //   try {
    //     const { data } = await axios({
    //       url: `${process.env.VUE_APP_SERVER}/knzkfz`,
    //       method: "GET",
    //     });
    //     this.kfz = data.data;
    //     console.log(this.kfz);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async delCar(e) {
      try {
        await axios({
          url: `${process.env.VUE_APP_SERVER}/knzkfz?id=${e.id}`,
          method: "delete",
        });
        return this.$emit("update");
      } catch (error) {
        console.error(error);
      }
    },
  },
  props: {
    kfz: {
      type: Array,
    },
  },

  // created() {
  //   this.fetchData();
  // },

  components: {
    CardView,
  },
};
</script>
