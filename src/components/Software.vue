<template>
	<v-data-table :headers="this.listSoftwareHeaders" :items="this.listSoftware" :item-class="SetRowColor" :custom-sort="CustomSort">
		<template v-slot:[`item.actions`]="{ item }">
			<v-btn icon plain :to="`/software/edit/${item.id}`">
				<v-icon>mdi-eye-outline</v-icon>
			</v-btn>
			<v-btn plain icon v-if="IsAssociated(item)" @click="DissociateSoftware(item.id)">
				<v-icon>mdi-link-variant-off</v-icon>
			</v-btn>
			<v-btn plain icon v-if="!IsAssociated(item)" @click="AssociateSoftware(item.id)">
				<v-icon>mdi-link-variant</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>

<script lang="js">
import Vue from "vue";
import AxiosApi from "@/plugins/axios";

export default Vue.extend({
	name: "Software",

	props: {
		id: null,
		type: null,
	},

	data () {
		return {
			listSoftware: [],
			listSoftwareHeaders: [
				{value: 'name', text: 'Name', align: 'start'},
				{value: 'state', text: 'State'},
				{value: 'actions', sortable: false, align: 'end'},
			]
		}
	},

	methods: {
		GetSoftware () {
			AxiosApi.get(`/software/${this.type}`).then((response) => {
				this.listSoftware = response.data;
			});
		},
		AssociateSoftware (id) {
			AxiosApi.put(`/${this.type}/${this.id}/software`, {
				softwareAdd: id
			}).then(() => {
				this.GetSoftware();
			});
		},
		DissociateSoftware (id) {
			AxiosApi.put(`/${this.type}/${this.id}/software`, {
				softwareRemove: id
			}).then(() => {
				this.GetSoftware();
			});
		},
		IsAssociated (item) {
			if (this.type === 'hardware') {
				return (item.Hardware.filter(hardware => hardware.id === this.id).length > 0);
			} else if (this.type === 'users') {
				return (item.Users.filter(user => user.id === this.id).length > 0);
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
					return + this.IsAssociated(a) < + this.IsAssociated(b) ? -1 : 1;
				} else {
					return + this.IsAssociated(b) < + this.IsAssociated(a) ? -1 : 1;
				}
      });

			return items;
		}
	},

	created () {
		this.GetSoftware();
	},
});
</script>
