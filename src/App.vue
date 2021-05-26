<template>
    <v-app>
    <v-navigation-drawer app clipped temporary v-model="drawer">
    
      
      <v-list>

        <v-list-item
          v-for="(item, i) in items"
          :key="i" link :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
             <v-list-item-title  v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left app dark dense src="https://picsum.photos/1920/1080?random" flat>

<template v-slot:img="{ props }">
        <v-img
          v-bind="props"
         gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.8)"
       
        ></v-img>
      </template>

     <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


      <v-app-bar-title>Software and Hardware Management</v-app-bar-title>


 <v-spacer></v-spacer>
      <v-btn to="/search-barcode" text active-class="no-active">
        <v-icon left>mdi-barcode-scan</v-icon>Barcode
      </v-btn>
      <v-btn text :to="this.GetProfileLink()" v-show="IsLoggedIn()" active-class="no-active">
        <v-icon left>mdi-card-account-details-outline</v-icon>{{ this.getUser().firstname + ' ' + this.getUser().lastname }}
      </v-btn>
      <v-btn to="/signin" text v-show="!IsLoggedIn()" active-class="no-active">
        <v-icon left>mdi-login-variant</v-icon>{{ $tc('signin') }}
      </v-btn>
      <v-btn @click="logout()" text v-show="IsLoggedIn()">
        <v-icon left>mdi-logout-variant</v-icon>{{ $tc('logout') }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: "App",

methods: {
    logout () {
      this.$store.dispatch('logout', '');
    },
    GetProfileLink() {
      return `/users/${this.getUser().id}/profile`;
    },
  },
  computed: {
    ...mapGetters(['getUser', 'IsLoggedIn'])
  },

  data: () => ({ 
    drawer: false,
    items: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
          { text: 'Software', icon: 'mdi-application', link: '/software' },
          { text: 'Hardware', icon: 'mdi-desktop-classic', link: '/hardware' },
          { text: 'User', icon: 'mdi-account', link: '/users'},
        ], }),
   
});
</script>
