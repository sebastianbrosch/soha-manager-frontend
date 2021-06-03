<template>
	<v-data-table :headers="this.listUsersHeaders" :items="this.listUsers" :item-class="SetRowColor" :custom-sort="CustomSort">
		<template v-slot:[`item.actions`]="{ item }">
			<v-btn plain icon v-if="IsAssociated(item)" @click.stop="DissociateUser(item.id)">
				<v-icon>mdi-link-variant-off</v-icon>
			</v-btn>
			<v-btn plain icon v-else @click.stop="AssociateUser(item.id)">
				<v-icon>mdi-link-variant</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>

<script lang="js">
import Vue from "vue";
import AxiosApi from "@/plugins/axios";

export default Vue.extend({
	name: "User",

	props: {
		id:null,
		type: null,
	},

	data () {
		return {
			listUsers: [],
			listUsersHeaders: [
				{value: 'email', text: 'E-Mail', align: 'start'},
				{value: 'firstname', text: 'Vorname'},
				{value: 'lastname', text: 'Nachname'},
				{value: 'actions', sortable: false, align: 'end' },
			]
    }
  },

	methods: {
		GetUsers () {
			AxiosApi.get(`/users/${this.type}`).then((response) => {
				this.listUsers = response.data;
			});
		},
		AssociateUser (id) {
			if (this.type === 'hardware') {
				AxiosApi.put(`/users/${id}`, {
					hardwareAdd: this.id
				}).then(() => {
					this.GetUsers();
				});
			} else if (this.type === 'software') {
				AxiosApi.put(`/users/${id}`, {
					softwareAdd: this.id
				}).then(() => {
					this.GetUsers();
				});
			}
		},
		DissociateUser (id) {
			if (this.type === 'hardware') {
				AxiosApi.put(`/users/${id}`, {
					hardwareRemove: this.id
				}).then(() => {
					this.GetUsers();
				});
			} else if (this.type === 'software') {
				AxiosApi.put(`/users/${id}`, {
					softwareRemove: this.id
				}).then(() => {
					this.GetUsers();
				});
			}
		},

		IsAssociated (item) {
			if (this.type === 'hardware') {
				return (item.Hardware.filter(hardware => hardware.id == this.id).length > 0);
			} else if (this.type === 'software') {
				return (item.Software.filter(software => software.id == this.id).length > 0);
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
		this.GetUsers();
	},
});
</script>
