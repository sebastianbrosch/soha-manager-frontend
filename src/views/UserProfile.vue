<template>
    <v-container class="mt-8">
    <v-row justify="space-around">
      <v-card width="600">
        <v-img
          height="100px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
        <v-card-title class="white--text mt-3">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://i.pravatar.cc/150"
              >
            </v-avatar>
            <p class="ml-3">{{ UserFullName() }}</p>  
          </v-card-title>
        </v-img>

<v-data-table :items="this.hardwareItems" :headers="this.hardwareHeaders" hide-default-header hide-default-footer>
    <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Hardware</v-toolbar-title>
          </v-toolbar>
    </template>
    </v-data-table>
    <v-divider></v-divider>
            <v-data-table :items="this.softwareItems" :headers="this.softwareHeaders" hide-default-header hide-default-footer class="mt-4">
        <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>Software</v-toolbar-title>
              </v-toolbar>
        </template>
        </v-data-table>
        </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";

export default Vue.extend({
  name: "UserProfile",

  created() {
    this.id = parseInt(this.$route.params.id);
    this.LoadUserInfo();
    this.LoadSoftwareItems();
    this.LoadHardwareItems();
  },

  data () {
    return {
      id: null,
      softwareItems: [],
      hardwareItems: [],
      userInfo: null,
      softwareHeaders: [
        { value: 'name', text: 'Name' },
        { value: 'state', text: 'State' },
      ],
      hardwareHeaders: [
        { value: 'name', text: 'Name' },
        { value: 'serialnumber', text: 'S/N' },
      ],
    }
  },

  methods: {
    UserFullName()  {
      if (this.userInfo) {
        return this.userInfo.firstname + ' ' + this.userInfo.lastname;
      } else {
        return '';
      }
    },
    LoadUserInfo() {
      api.get(`/users/${this.id}`).then(async (response) => {
        this.userInfo = response.data;
      });
    },
    LoadSoftwareItems() {
      api.get(`/users/${this.id}/software`).then((response) => {
        this.softwareItems = response.data;
      });
    },
    LoadHardwareItems() {
      api.get(`/users/${this.id}/hardware`).then((response) => {
        this.hardwareItems = response.data;
      });
    }
  }

});
</script>