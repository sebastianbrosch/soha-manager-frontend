<template>
  <v-data-table :headers="this.hardwareHeaders" :items="this.hardwareItems" :item-class="SetRowColor" :custom-sort="customSort">
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn plain icon v-if="IsAssigned(item)" @click.stop="RetractHardware(item.id)">
        <v-icon>mdi-link-variant-off</v-icon>
      </v-btn>
      <v-btn plain icon v-else @click.stop="AssignHardware(item.id)">
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>


<script lang="ts">
import Vue from "vue";
import api from "@/plugins/axios";

export default Vue.extend({
  name: "Hardware",


   created () {
     this.LoadHardwareItems();
  },

   data () {
    return {
      hardwareItems: [],
      hardwareHeaders: [
        {value: 'name', text: 'Name'},
        {value: 'serialnumber', text: 'S/N'},
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
    LoadHardwareItems () { 
      api.get(`/hardware/${this.type}`).then((response) => {
        this.hardwareItems = response.data;
      });
    },
    IsAssigned(item) {
      if (this.type === 'users') {
        return (item.Users.filter(itemUser => itemUser.id == this.id).length > 0);
      }
      return false;
    },
    AssignHardware(id: number) {
      api.put(`/${this.type}/${this.id}`, {
        hardwareAdd: id
      }).then(() => {
        this.LoadHardwareItems();
      });
    },
    RetractHardware(id: number) {
      api.put(`/${this.type}/${this.id}`, {
        hardwareRemove: id
      }).then(() => {
        this.LoadHardwareItems();
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
    
  }
});

</script>