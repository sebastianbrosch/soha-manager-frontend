<template>
<v-container>
    <v-row>
      <v-col cols="12" md="6">
    <v-text-field label="Format" :value="this.format"></v-text-field>

      </v-col>
      <v-col cols="12" md="6">
    <v-text-field label="Code" :value="this.code" :append-icon="'mdi-barcode-scan'" @click:append="OpenBarcodeDialog"></v-text-field>

      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12">
      <v-data-table :items="hardwareItems" :headers="hardwareHeaders">
<template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Hardware</v-toolbar-title>
        </v-toolbar>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
      <v-data-table :items="softwareItems" :headers="softwareHeaders">
<template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Software</v-toolbar-title>
        </v-toolbar>
        </template>

      </v-data-table>
      </v-col>
    </v-row>
    <ScanBarcode ref="barcode"></ScanBarcode>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";
import ScanBarcode from "@/components/ScanBarcode.vue";

export default Vue.extend({
  name: 'SearchBarcode',
  components: {
    ScanBarcode
  },
data() {
  return {
    format: '',
    code: '',
    hardwareItems: [],
    softwareItems: [],
    hardwareHeaders: [
      { text: 'Name', value: 'name' }
    ],
    softwareHeaders: [
      { text: 'Name', value: 'name' }
    ],
    userHeaders: [],
  }
},

methods: {
 
      OpenBarcodeDialog() {
        (this.$refs.barcode as Vue & { open: () => Promise<object>}).open().then((barcodeInfo) => {
          this.code = barcodeInfo.code;
          this.format = barcodeInfo.format;
          this.LoadBarcodeItems();
        });
    },
    LoadBarcodeItems() {
      api.post(`/hardware/barcodes`, {
        format: this.format,
        code: this.code
      }).then(response => {
        console.log(response.data);
        this.hardwareItems = response.data;
      });

      api.post(`/software/barcodes`, {
        format: this.format,
        code: this.code
      }).then(response => {
        console.log(response.data);
        this.softwareItems = response.data;
      });
    },
}

});
</script>