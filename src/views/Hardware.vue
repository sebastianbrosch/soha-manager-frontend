<template>
  <v-container>
    <v-data-table flat :headers="hardwareHeaders" :items="hardwareItems" item-key="id" :mobile-breakpoint="0">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Hardware</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark to="/hardware/new">
            <v-icon left>mdi-plus</v-icon>{{ $tc('new hardware') }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon :to="{ name: 'HardwareEdit', params: { id: item.id } }">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon @click="DeleteHardwareItem(item)">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <ConfirmDialog ref="confirm"></ConfirmDialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/plugins/axios";
import { Hardware } from "@/plugins/backend";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default Vue.extend({
  name: "Hardware",
 components: {
   ConfirmDialog
 },
  created() {
    this.GetHardwareItems();
  },

  data () {
    return {
      dialog: false,
      hardwareItems: [],
      hardwareHeaders: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'S/N', value: 'serialnumber' },
        { text: 'Type', value: 'devicetype' },
        { text: 'Offline Archive', value: 'offlinefolder' },
        { text: 'State', value: 'state' },
        { value: 'actions', sortable: false, align: 'end' },
      ],
    }
  },
  
  methods: {
    GetHardwareItems () {
      api.get('/hardware').then((response) => {
        this.hardwareItems = response.data;
      });
    },
    DeleteHardwareItem (hardware: Hardware) {
      (this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${hardware.name}?`, { color: 'red' }).then((confirm) => {
if (confirm === true) {
  api.delete(`/hardware/${hardware.id}`).then(() => {
    this.GetHardwareItems();
  });

}
      });


    }
  },  
});
</script>