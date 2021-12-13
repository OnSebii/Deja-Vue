<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> Add Car </v-btn> -->
          <v-btn icon>
            <v-icon v-bind="attrs" v-on="on">mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5">Auto und Kennzeichen hinzufügen</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span class="subtitle-1">Kennzeichen:</span>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="bezirk"
                    :rules="bezirkRules"
                    label="Bezirk"
                    required
                    hint="Abkürzung des Zulassungsbezirkes"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="nummer"
                    :rules="nummerRules"
                    label="Nummer"
                    required
                    hint="Nummer der Nummerntafel"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <span class="subtitle-1">Auto:</span>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Marke"
                    v-model="marke"
                    :rules="markeRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Modell"
                    v-model="modell"
                    :rules="modellRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Gesehen"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <small> Alle Felder müssen ausgefüllt sein </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="addCar()"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  name: "AddCar",
  data: () => ({
    dialog: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu2: false,

    valid: true,
    bezirk: "",
    bezirkRules: [
      (v) => !!v || "Bezirk ist erforderlich",
      (v) => (v && v.length <= 4) || "Der Beirk muss weniger als 4 Zeichen umfassen",
    ],
    nummer: "",
    nummerRules: [
      (v) => !!v || "Nummer ist erforderlich",
      (v) => (v && v.length <= 8) || "Die Nummer muss weniger als 8 Zeichen umfassen",
    ],
    marke: "",
    markeRules: [
      (v) => !!v || "Marke ist erforderlich",
      (v) => (v && v.length <= 10) || "Die Marke muss weniger als 10 Zeichen umfassen",
    ],
    modell: "",
    modellRules: [
      (v) => !!v || "Modell ist erforderlich",
      (v) => (v && v.length <= 10) || "Das Modell muss weniger als 10 Zeichen umfassen",
    ],
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async addCar() {
      if (this.validate() == true)
        try {
          let kennzeichenId = null;
          let kfzId = null;

          const data = await axios({
            url: `${process.env.VUE_APP_SERVER}/kennzeichen`,
            method: "post",
            contentType: "application/json",
            data: {
              bezirk: this.bezirk,
              nummer: this.nummer,
            },
          });
          kennzeichenId = data.data.kennzeichenId;

          const data2 = await axios({
            url: `${process.env.VUE_APP_SERVER}/kfz`,
            method: "post",
            contentType: "application/json",
            data: {
              marke: this.marke,
              modell: this.modell,
              gesehen: this.date,
            },
          });
          kfzId = data2.data.carId;

          console.log(kennzeichenId, kfzId);

          const data3 = await axios({
            url: `${process.env.VUE_APP_SERVER}/knzkfz`,
            method: "post",
            contentType: "application/json",
            data: {
              knzid: kennzeichenId,
              kfzid: kfzId,
            },
          });

          console.log(data3.data.data);
          // ToDO Alert einbauen wenns hinzugefügt wurde
          this.$emit("update");
          this.dialog = false;
        } catch (error) {
          console.error(error);
        }
    },
  },

  props: {},
};
</script>
