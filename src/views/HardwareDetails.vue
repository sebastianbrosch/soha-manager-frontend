<template>
  <v-form>
    <v-container class="mt-8">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="name" label="Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="serialnumber" label="Serial Number" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="devicetype" :items="devicetypeItems" label="Device Type" required></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field v-model="offlinefolder" label="Offline Folder"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="state" :items="stateItems" label="State" required></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5">
          <v-btn class="mr-4" color="success" @click="SaveHardwareItem">
            <v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}
          </v-btn>
          <v-btn class="mr-4" @click="CancelHardwareItem">
            <v-icon left>mdi-close</v-icon>{{ $tc('cancel') }}
          </v-btn>
          
        </v-col>
      </v-row>
      <v-row class="mt-12">
        <v-col cols="12" md="8">
          <v-card v-if="id > 0">
            <v-tabs dark >
              <v-tab>{{ $tc('comment', 2) }}</v-tab>
              <v-tab>{{ $tc('document', 2) }}</v-tab>
              <v-tab>{{ $tc('file', 2) }}</v-tab>
              <v-tab>{{ $tc('software', 2) }}</v-tab>
              <v-tab>{{ $tc('barcode', 2) }}</v-tab>
      <v-tab-item>
        <Comments type="hardware" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
<Documents type="hardware" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
        <Files type="hardware" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
        <Software :id="this.id" type="hardware"/>
      </v-tab-item>
      <v-tab-item>
        <Barcodes :id="this.id" type="hardware" />
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
import Comments from "@/components/Comments.vue";
import Documents from "@/components/Documents.vue";
import Software from "@/components/Software.vue";
import Barcodes from "@/components/Barcodes.vue";
import Files from "@/components/Files.vue";

export default Vue.extend({
  components: {
    Comments,
    Documents,
    Software,
    Barcodes,
    Files
  },
  name: "HardwareDetails",
   data () {
       return {
          tab: null,
           id: null,
           name: null,
           createdAt: null,
           serialnumber: null,
           devicetype: null,
           offlinefolder: null,
           devicetypeItems: [
        'Computer',
        'Laptop',
        'Switch',
        'Router',
        'Festplatte',
        'Monitor'
      ],
      stateItems: [
          'active',
          'inactive'
      ],
      'state': null,
       }
  },
  methods: {
      LoadHardwareItem() {
        if (this.id) {
          api.get(`/hardware/${this.id}`).then((response) => {
              this.id = response.data.id,
              this.name = response.data.name,
              this.serialnumber = response.data.serialnumber,
              this.devicetype = response.data.devicetype,
              this.offlinefolder = response.data.offlinefolder,
              this.state = response.data.state,
              this.createdAt = response.data.createdAt
          });
        }
      },
      CancelHardwareItem() {
          this.id = -1;
          this.name = null;
          this.serialnumber = null;
          this.devicetype = null;
          this.offlinefolder = null;
          this.state = null;
        this.$router.push('/hardware');
      },
      SaveHardwareItem() {
          if (this.id) {
              api.put(`/hardware/${this.id}`, {
                  name: this.name,
                  serialnumber: this.serialnumber,
                  devicetype: this.devicetype,
                  offlinefolder: this.offlinefolder,
                  state: this.state
              }).then(() => {
                  this.$router.push('/hardware');
              });
          } else {
              api.post("/hardware/", {
                  name: this.name,
                  serialnumber: this.serialnumber,
                  devicetype: this.devicetype,
                  offlinefolder: this.offlinefolder,
                  state: this.state
              }).then(() => {
                  this.$router.push('/hardware');
              });
          }
      }
  },
  created() {
    if (this.$route.params.id) {
      this.id = parseInt(this.$route.params.id);
    }

          this.LoadHardwareItem();
  },
});
</script>