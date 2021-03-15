<template>
<v-container>
  <v-row>
    <v-col cols="12">
  <v-data-table :headers="this.barcodeHeader" :items="this.barcodeItems">
    <template v-slot:[`item.actions`]="{ item }">
          <v-btn plain icon @click="DeleteBarcode(item)">
            <v-icon >mdi-trash-can-outline</v-icon>
          </v-btn>
    </template>
  </v-data-table>
    </v-col>
  </v-row>
<v-divider></v-divider>

    <v-row>
<v-col>
<v-text-field v-model="format" label="Type"></v-text-field>
</v-col>
<v-col>
  <v-text-field label="Barcode" v-model="code" :append-icon="'mdi-barcode-scan'" @click:append="OpenBarcodeDialog"></v-text-field>
</v-col>
    </v-row>
      
      <v-btn color="success" @click="SaveBarcodes"><v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}</v-btn>

     <ConfirmDialog ref="confirm"></ConfirmDialog>
     <ScanBarcode ref="barcode"></ScanBarcode>
</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import ScanBarcode from "@/components/ScanBarcode.vue";
import { Barcode } from "@/plugins/backend";

export default Vue.extend({
  name: "Barcodes",
   props: {
    type: String,
    id: Number,
  },
  components: {
    ConfirmDialog,
    ScanBarcode
  },

created() {
  this.LoadBarcodes();
},

  data() {
    return {
      code: '',
      format: '',
      barcodeItems: [],
      barcodeHeader: [
        { value: 'format', text: 'Format' },
        { value: 'code', text: 'Code' },
        { value: 'label', text: 'Description' },
        { value: 'actions', align: 'end' },
      ],
    }
  },
  methods: {
    OpenBarcodeDialog() {
      (this.$refs.barcode as Vue & { open: () => Promise<any> }).open().then((barcodeInfo) => {
        this.code = barcodeInfo.code,
        this.format = barcodeInfo.format
      });
    },
    LoadBarcodes() {
      api.get(`/${this.type}/${this.id}/barcodes`).then(response => {
        this.barcodeItems = response.data;
      });
    },
    SaveBarcodes () {
      api.post(`/${this.type}/${this.id}/barcodes`, {
        format: this.format,
        barcode: this.code,
      }).then(() => {
        this.format = '';
        this.code = '';
        this.LoadBarcodes();
      });
    },
    DeleteBarcode (barcode: Barcode) {
       (this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${barcode.code}?`, { color: 'red' }).then((confirm) => {
         if (confirm === true) {
           api.delete(`/${this.type}/${this.id}/barcodes/${barcode.id}`).then(() => {
             this.LoadBarcodes();
           });
         }
       });
    }
  }
});
</script>