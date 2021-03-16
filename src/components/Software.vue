<template>
  <v-data-table :headers="this.softwareHeaders" :items="this.softwareItems" :item-class="SetRowColor" :custom-sort="customSort">
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn icon plain :to="`/software/edit/${item.id}`">
        <v-icon>mdi-eye-outline</v-icon>
      </v-btn>
      <v-btn plain icon v-if="IsAssigned(item)" @click="RetractSoftware(item.id)">
        <v-icon>mdi-link-variant-off</v-icon>
      </v-btn>
      <v-btn plain icon v-if="!IsAssigned(item)" @click="AssignSoftware(item.id)">
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";

export default Vue.extend({
  name: "Software",

  created () {
    this.LoadSoftwareItems();
  },

  data () {
    return {
      softwareItems: [],
      softwareHeaders: [
        {value: 'name', text: 'Name'},
        {value: 'state', text: 'State'},
        {value: 'actions', sortable: false, align: 'end' },
      ]
    }
  },

  props: {
    id: Number,
    type: String,
  },

  methods: {
    SetRowColor(item) {
      return this.IsAssigned(item) ? 'light-green lighten-5' : 'unset';
    },
    IsAssigned (item) {
      
      if (this.type === 'hardware') {
        return (item.Hardware.filter(itemHardware => itemHardware.id === this.id).length > 0);
      } else if (this.type === 'users') {
        return (item.Users.filter(itemUser => itemUser.id === this.id).length > 0);
      }
      return false;
    },

     LoadSoftwareItems () {
      api.get(`/software/${this.type}`).then((response) => {
        this.softwareItems = response.data;
      });
    },
     AssignSoftware (id: number) {
       api.put(`/${this.type}/${this.id}`, {
        softwareAdd: id
      }).then((response) => {
        this.LoadSoftwareItems();
      });
    },
     RetractSoftware (id: number) {
       api.put(`/${this.type}/${this.id}`, {
        softwareRemove: id
      }).then((response) => {
        this.LoadSoftwareItems();
      });
    },

    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] === undefined) {
          if (!isDesc) {
            return + this.IsAssigned(a) < + this.IsAssigned(b) ? -1 : 1;
          } else {
            return + this.IsAssigned(b) < + this.IsAssigned(a) ? -1 : 1;
          }

        }
      });
      return items;
    }
  },
});
</script>