<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="firstname" label="Firstname" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" label="Lastname" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" label="E-Mail" required autocomplete="username"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field v-model="password" autocomplete="new-password" label="Password" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword=!showPassword"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-btn class="mr-4" @click="SaveUserItem" color="success">
            <v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}
          </v-btn>
          <v-btn class="mr-4" @click="CancelUserItem">
            <v-icon left>mdi-close</v-icon>{{ $tc('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
       <v-row class="mt-12">
        <v-col cols="12" md="8">
          <v-card v-if="this.id > 0">
            <v-tabs dark >
              <v-tab>{{ $tc('hardware') }}</v-tab>
              <v-tab>{{ $tc('software') }}</v-tab>
      <v-tab-item>
<Hardware type="users" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
<Software type="users" :id="this.id" />
      </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>  
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";
import { mapGetters } from "vuex";
import Software from "../components/Software.vue";
import Hardware from "../components/Hardware.vue";

export default Vue.extend({
  name: "HardwareDetails",

  components: {
    Software,
    Hardware
  },

  created () {
    const id: number = parseInt(this.$route.params.id);

    if (id) {
      this.LoadUserItem(id);
    }
  },

  computed: {
    ...mapGetters(['GetUserToken'])
  },

  data () {
    return {    
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      showPassword: false,
    }
  },

  methods: {
    LoadUserItem (id: number) {
      let config = {};

      if (this.GetUserToken()) {
        config = { headers: { Authorization: `Bearer ${this.GetUserToken()}` } }
      }

      api.get(`/users/${id}`, config).then((response) => {
        this.id = response.data.id;
        this.firstname = response.data.firstname;
        this.lastname = response.data.lastname;
        this.email = response.data.email;
        this.password = null;
      });
    },

    SaveUserItem () {
      if (this.id) {
        api.put("/users/" + this.id, {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push('/users');
        });
      } else {
        api.post("/users/", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push('/users');
        });
      }
    },

    CancelUserItem() {
      this.id = null;
      this.firstname = null;
      this.lastname = null;
      this.email = null;
      this.password = null;
      this.$router.push('/users');
    },  
  },
});
</script>