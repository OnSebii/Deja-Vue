<template>
  <div>
    <CardView :employees="employees" @del="delEmployee"></CardView>
  </div>
</template>

<script>
import CardView from "@/components/CardView.vue";
export default {
  name: "Home",
  data() {
    return {
        
    };
  },

  components: {
    CardView,
  },
};
</script>
