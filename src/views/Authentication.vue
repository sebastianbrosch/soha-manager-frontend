<template>

<v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-6">
              <v-window v-model="step">
                
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8" class="mt-8 mb-8">
                      <v-card-text>
                        <h1 class="text-center">Sign up to SoHa</h1>
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-col cols="6" md="6" sm="12" >
                                <v-text-field label="First Name" name="firstname" type="text" v-model="firstname"></v-text-field>
                              </v-col>
                              <v-col cols="6" md="6" sm="12">
                                <v-text-field label="Last Name" name="lastname" type="text" v-model="lastname"></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="E-Mail" name="email" type="text" v-model="email" autocomplete="username"></v-text-field>
                              </v-col>
                              <v-col col="12">
                                <v-text-field label="Password" name="password" type="password" v-model="password" autocomplete="new-password"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <div class="text-center">
                            <v-btn dark @click="SignUp">create account</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="grey lighten-3">
                      <v-card-text class="mt-12">
                        <div class="text-center">
                          <span>You have a existing account. You can login directly.</span>
                          <v-btn outlined @click="step=2" class="mt-3">Sign in!</v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                           
                <v-window-item :value="2">
                  <v-row>
                    <v-col cols="12" md="8" class="mt-8 mb-8">
                      <v-card-text>
                        <h1 class="text-center">Sign in to SoHa</h1>
                        <v-form>
                          <v-text-field label="E-Mail" name="email" type="text" v-model="email" autocomplete="username"></v-text-field>
                          <v-text-field label="Password" name="password" type="password" v-model="password" autocomplete="current-password"></v-text-field>
                          <div class="text-center">
                              <v-btn dark @click="SignIn">Sign in!</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="grey lighten-3">
                      <v-card-text class="mt-12">
                        <div class="text-center">
                          <span>You have no account. You can create a new account now.</span>
                          <v-btn outlined @click="step=1" class="mt-3">create account</v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>  
</template>


<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";

export default Vue.extend({
  name: "Authentication",

  created () {
    if (this.$route.name === 'SignIn') {
      this.step = 2;
    } else {
      this.step = 1;
    }
  },

  data () {
    return {
      step: 1,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      submitted: false
    }
  },
  methods: {
    SignUp () {
      this.submitted = true;
      api.post('/signup', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/');
      });
    },
    SignIn () {
      this.submitted = true;
      api.post('/signin', {
        email: this.email,
        password: this.password
      }).then((response) => {
        const token = response.data.token;
        const user = response.data.user;
      
        this.$store.dispatch('login', {token, user});
        this.$router.push('/');
      });
    }
  }
});
</script>