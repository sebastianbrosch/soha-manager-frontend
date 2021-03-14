<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="cardItem in cardItems" :key="cardItem.title">
        <v-card color="grey lighten-4" >
             <v-img class="align-end white--text"
               gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.8)"
       :src="cardItem.img" height="200px"
    >
     <v-card-title v-text="cardItem.title"></v-card-title>
    </v-img>
          <v-card-subtitle>{{ cardItem.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :to="cardItem.url" color="grey lighten-2" light>Show {{ cardItem.title }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Dashboard",

  data () {
    return {
      cardItems: [
        { title: 'Software', description: 'Manage the Software', url: '/software', img: require('../assets/bg-software.png') },
        { title: 'Hardware', description: 'Manage the Hardware', url: '/hardware', img: require('../assets/bg-hardware.png') },
        { title: 'User', description: 'Manage the Users', url: '/users', img: require('../assets/bg-users.png') },
      ]
    }
  }
});
</script>