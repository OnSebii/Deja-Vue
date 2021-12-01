<template>
  <div>
    <div class="row justify-center">
      <div class="mx-2" v-for="e in kfz" :key="e.id">
        <v-card class="mx-auto my-12" max-width="374" elevation="5" outlined>
          <v-card-title>{{ e.marke }} {{ e.modell }}</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">Kennzeichen • {{ e.bezirk }} {{ e.nummer }}</div>
            <div class="my-4 text-subtitle-1">
              Gesehen am • {{ e.gesehen | moment("D.MM.YYYY") }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="red darken-4" text @click="$emit('del', e)"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardView",
  data: () => ({
    
  }),

  props: {
    kfz: {
      type: Array,
    },
  },
};
</script>
