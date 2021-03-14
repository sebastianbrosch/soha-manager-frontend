<template>
  <v-container>
    <v-data-table flat :headers="softwareHeaders" :items="softwareItems" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Software</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark to="/software/new">
            <v-icon left>mdi-plus</v-icon>{{ $tc('new software') }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon :to="{ name: 'SoftwareEdit', params: { id: item.id } }">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon @click="DeleteSoftwareItem(item)">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <ConfirmDialog ref="confirm"></ConfirmDialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Software } from "../plugins/backend";

export default Vue.extend({
  name: "Software",

components: {
  ConfirmDialog
},

  created () {
    this.GetSoftwareItems();
  },

  data () {
    return {
      softwareItems: [],
      softwareHeaders: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: '# of devices', value: 'units' },
        { text: 'Offline Archive', value: 'offlinefolder' },
        { text: 'State', value: 'state' },
        { align: 'end', value: 'actions', sortable: false },
      ]
    }
  },

  methods: {
    GetSoftwareItems () {
      api.get("/software").then((response) => {
        this.softwareItems = response.data;
      });
    },
    DeleteSoftwareItem (software: Software) {
       this.$refs.confirm.open('Delete', `Are you sure you want to delete ${software.name}?`, { color: 'red' }).then((confirm) => {
if (confirm === true) {
  api.delete(`/software/${software.id}`).then(() => {
   this.GetSoftwareItems();
 });

}
       });
    },
  },
});
</script>