<template>
  <v-dialog v-model="dialog" :max-width="this.readerSize.width">
    <v-card :height="this.readerSize.height" :width="this.readerSize.width">
      <v-card-text class="pa-0">
        <v-quagga v-if="dialog" :onDetected="detected" :readerSize="readerSize" :aspectRatio="aspectRatio" :readerTypes="this.arrReaderTypes"></v-quagga>
      </v-card-text>
    </v-card>
     
  </v-dialog>
</template>


<script lang="ts">
import Vue from "vue";
import VueQuagga from 'vue-quaggajs';

Vue.use(VueQuagga);

export default Vue.extend({
  name: "ScanBarcode",

  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    hasDetectedBarcode: false,
    arrReaderTypes: ['code_128_reader', 'code_39_reader', 'code_39_vin_reader', 'ean_reader', 'ean_8_reader' ],
    readerSize: {
      width: 640,
      height: 480
    },
    aspectRatio: {
      min: 1,
      max: 3
    },
  }),

  methods: {
    open() {
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    detected(data) {
      this.hasDetectedBarcode = true;
      this.resolve({
        code: data.codeResult.code, 
        format: data.codeResult.format
      });
      this.dialog = false;
    }
  }
});
</script>