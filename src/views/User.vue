<template>
  <v-container>
    <v-data-table flat :headers="userHeader" :items="userItems" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $tc('user') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark to="/user/new">
            <v-icon left>mdi-plus</v-icon>{{ $tc('new user') }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon :to="{ name: 'UserEdit', params: { id: item.id } }">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon @click="DeleteUserItem(item)">
          <v-icon dense>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
		<ConfirmDialog ref="confirm"></ConfirmDialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../plugins/backend";
import AxiosApi from "@/plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default Vue.extend({
  name: "User",

  created () {
    this.GetUserItems();
  },

	components: {
		ConfirmDialog
	},

  data () {
    return {
      userHeader: [
        { text: 'Lastname', align: 'start', value: 'lastname' },
        { text: 'Firstname', value: 'firstname' },
        { text: 'E-Mail', value: 'email' },
        { value: 'actions', align: 'end', sortable: false }
      ],
      userItems: []
    }
  },

  methods: {
    GetUserItems () {
      AxiosApi.get('/users').then((response) => {
        this.userItems = response.data;
      });
    },
    DeleteUserItem(user: User) {
			(this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${user.email}?`, { color: 'red' }).then((confirm) => {
				if (confirm === true) {
					AxiosApi.delete(`/users/${user.id}`).then(() => {
						this.GetUserItems();
					});
				}
			});
    },
  },
});
</script>
