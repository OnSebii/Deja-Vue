<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue darken-4" v-bind="attrs" v-on="on" text> Edit </v-btn>
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

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Marke"
                    v-model="marke"
                    :rules="markeRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Modell"
                    v-model="modell"
                    :rules="modellRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small> Alle Felder müssen ausgefüllt sein </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="editCar()"> Save </v-btn>
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
    async editCar() {
      if (this.validate() == true)
        try {
          await axios({
            url: `${process.env.VUE_APP_SERVER}/kfz/${this.car.id}`,
            method: "patch",
            contentType: "application/json",
            data: {
              modell: this.modell,
              marke: this.marke,
            },
          });

          await axios({
            url: `${process.env.VUE_APP_SERVER}/kennzeichen/${this.car.id}`,
            method: "patch",
            contentType: "application/json",
            data: {
              bezirk: this.bezirk,
              nummer: this.nummer,
            },
          });

          // ToDO Alert einbauen wenns aktualisiert wurde
          this.$emit("update");
          this.dialog = false;
        } catch (error) {
          console.error(error);
        }
    },
  },

  props: {
    car: {
      type: Object,
    },
  },
  created() {
    this.bezirk = this.car.bezirk;
    this.nummer = this.car.nummer;
    this.marke = this.car.marke;
    this.modell = this.car.modell;
  },
};
</script>
