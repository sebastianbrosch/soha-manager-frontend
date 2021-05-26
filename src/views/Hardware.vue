<template>
  <v-container>
    <v-data-table flat :headers="hardwareHeader" :items="hardwareItems" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $tc('hardware') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark to="/hardware/new">
            <v-icon left>mdi-plus</v-icon>{{ $tc('new hardware') }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
				<v-btn v-if="IsDisposalDevice(item.type)" icon :to="{ name: 'HardwareDisposal', params: { id: item.id } }">
					<v-icon>mdi-delete-variant</v-icon>
				</v-btn>
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
import { Hardware } from "../plugins/backend";
import AxiosApi from "@/plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default Vue.extend({
  name: "Hardware",

	created () {
    this.GetHardwareItems();
  },

 	components: {
		ConfirmDialog
 	},

	data () {
    return {
      dialog: false,
      hardwareHeader: [
				{ text: 'Name', align: 'start', value: 'name' },
        { text: 'S/N', value: 'serialnumber' },
        { text: 'Type', value: 'devicetype' },
        { text: 'Offline Archive', value: 'offlinefolder' },
        { text: 'State', value: 'state' },
        { value: 'actions', sortable: false, align: 'end' },
      ],
			hardwareItems: [],
    }
  },

	methods: {
		IsDisposalDevice (type: string) {
			return ['Computer', 'Notebook'].filter(n => n === type).length === 0 ? false : true;
		},
    GetHardwareItems () {
      AxiosApi.get('/hardware').then((response) => {
				this.hardwareItems = response.data;
      });
    },
    DeleteHardwareItem (hardware: Hardware) {
      (this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${hardware.name}?`, { color: 'red' }).then((confirm) => {
				if (confirm === true) {
					AxiosApi.delete(`/hardware/${hardware.id}`).then(() => {
						this.GetHardwareItems();
  				});
				}
      });
    },
  },
});
</script>
