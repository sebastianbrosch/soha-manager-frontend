<template>
	<v-data-table :headers="this.listHardwareHeaders" :items="this.listHardware" :item-class="SetRowColor" :custom-sort="CustomSort">
		<template v-slot:[`item.actions`]="{ item }">
			<v-btn plain icon v-if="IsAssociated(item)" @click.stop="DissociateHardware(item.id)">
				<v-icon>mdi-link-variant-off</v-icon>
			</v-btn>
			<v-btn plain icon v-else @click.stop="AssociateHardware(item.id)">
				<v-icon>mdi-link-variant</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>

<script lang="js">
import Vue from "vue";
import AxiosApi from "@/plugins/axios";

export default Vue.extend({
	name: "Hardware",

	props: {
		id:null,
		type: null,
	},

	data () {
		return {
			listHardware: [],
			listHardwareHeaders: [
				{value: 'name', text: 'Name', align: 'start'},
				{value: 'state', text: 'State'},
				{value: 'actions', sortable: false, align: 'end' },
			]
    }
  },

	methods: {
		GetHardware () {
			AxiosApi.get(`/hardware/${this.type}`).then((response) => {
				console.log(response);
				this.listHardware = response.data;
			});
		},
		AssociateHardware (id) {
			AxiosApi.put(`/${this.type}/${this.id}`, {
				hardwareAdd: id
			}).then(() => {
				this.GetHardware();
			});
		},
		DissociateHardware (id) {
			AxiosApi.put(`/${this.type}/${this.id}`, {
				hardwareRemove: id
			}).then(() => {
				this.GetHardware();
			});
		},
		IsAssociated (item) {
			if (this.type === 'users') {
				return (item.Users.filter(user => user.id == this.id).length > 0);
      } else {
				return false;
			}
    },
		SetRowColor (item) {
			return this.IsAssociated(item) ? 'light-green lighten-5' : 'unset';
    },
		CustomSort (items, index, isDescending) {
			items.sort((a, b) => {
				if (!isDescending) {
					return +this.IsAssociated(a) < +this.IsAssociated(b) ? -1 : 1;
				} else {
					return +this.IsAssociated(b) < +this.IsAssociated(a) ? -1 : 1;
				}
			});

			return items;
		}
	},

	created () {
		this.GetHardware();
	},
});
</script>
