<template>
   <v-form>
        <v-container  class="mt-8">
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="license" label="License" :append-icon="'mdi-content-copy'" ref="license" @click:append="copyText()"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="units" label="Units"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="offlinefolder" label="Offline Folder"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select v-model="state"
            :items="stateItems"
            label="State"
            required
            ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-btn color="success"
                    class="mr-4"
                    @click="SaveSoftwareItem"
                    ><v-icon left>mdi-content-save-outline</v-icon>
                    {{ $tc('save') }}
                    </v-btn>
                    <v-btn class="mr-4" @click="CancelSoftwareItem"><v-icon left>mdi-close</v-icon>{{ $tc('cancel') }}</v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-12">
        <v-col cols="12" md="8">
          <v-card v-if="id > 0">
            <v-tabs dark >
              <v-tab>{{ $tc('comment', 2) }}</v-tab>
              <v-tab>{{ $tc('document', 2) }}</v-tab>
<v-tab>{{ $tc('barcode', 2) }}</v-tab>
      <v-tab-item>
        <Comments type="software" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
<Documents type="software" :id="this.id" />
      </v-tab-item>
      <v-tab-item>
     <Barcodes :id="this.id" type="software" />
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
import Comments from '@/components/Comments.vue';
import Documents from '@/components/Documents.vue';
import Barcodes from '@/components/Barcodes.vue';

export default Vue.extend({
  name: "SoftwareDetails",
  components: {
      Comments,
      Documents,
      Barcodes
  },
  data () {
      return {
          stateItems: ['active', 'inactive', 'expired'],
          id: null,
          name: null,
          license: null,
          units: null,
          offlinefolder: null,
          state: null,
          createdAt: null,
      }
  },
  methods: {
     
      LoadSoftwareItem(id: number) {
          api.get(`/software/${id}`).then((response) => {
              this.id = response.data.id,
              this.name = response.data.name,
              this.license = response.data.license,
              this.units = response.data.units,
              this.offlinefolder = response.data.offlinefolder,
              this.state = response.data.state,
            this.createdAt = response.data.createdAt
          });
      },
      CancelSoftwareItem() {
          this.id = null;
          this.name = null;
          this.license = null;
          this.units = null;
          this.offlinefolder = null;
          this.state = null;
          this.$router.push('/software');
      },
       copyText() {
      navigator.clipboard.writeText(this.$refs.license.value);
    },
      SaveSoftwareItem() {

          if (this.id) {
            api.put(`/software/${this.id}`, {
                name: this.name,
                license: this.license,
                units: this.units,
                offlinefolder: this.offlinefolder,
                state: this.state
            }).then(() => {
                this.$router.push('/software');
            });
          } else {
            api.post("/software", {
                name: this.name,
                license: this.license,
                units: this.units,
                offlinefolder: this.offlinefolder,
                state: this.state
            }).then(() => {
                this.$router.push('/software');
            });
        }
    },
  },
  created() {
      const id: number = parseInt(this.$route.params.id);

      if (id) {
          this.LoadSoftwareItem(id);
      }
  }
});
</script>