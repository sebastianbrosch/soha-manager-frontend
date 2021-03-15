<template>
  <v-container>
    <v-data-table :headers="this.documentHeaders" :items="this.documentItems">
      <template v-slot:[`item.mime`]="{ item }" >
          <v-icon v-if="item.mime == 'application/pdf'">mdi-file-pdf-outline</v-icon>
          <v-icon v-else>mdi-file-outline</v-icon>
  </template>
        <template v-slot:[`item.tags`]="{ item }" >
    <v-chip small class="mr-2" v-for="type in splitItems(item.tags)" :key="type">{{ type }}</v-chip>
  </template>
      <template v-slot:[`item.actions`]="{ item }">
           <v-btn v-if="item.static_file" icon :href="`https://192.168.0.143:9001/static/${item.static_file}`" target="_blank">
            <v-icon  >mdi-file-eye-outline</v-icon>
          </v-btn>
       <v-btn icon @click="DeleteDocument(item)">
            <v-icon >mdi-delete-outline</v-icon>
          </v-btn>
    </template>
    </v-data-table>
    <form>
     <v-select
          v-model="tags"
          :items="states"
          :menu-props="{ maxHeight: '400' }"
          label="Type of Document"
          multiple
          persistent-hint
        ></v-select>
        <v-textarea v-model="description" label="Description"></v-textarea>
        <v-file-input v-model="documentfile" accept=".pdf"></v-file-input>
      <v-btn color="success" @click="SaveDocument"><v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}</v-btn>
    </form>
    <ConfirmDialog ref="confirm"></ConfirmDialog>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Document } from "@/plugins/backend";

export default Vue.extend({
  name: "Documents",
  components: {
    ConfirmDialog
  },
  props: {
    type: String,
    id: Number,
  },
  data () {
    return {
      documentItems: [],
      documentHeaders: [
        { value: 'mime', align: 'start', width: 15 },
        { value: 'filename', text: 'Datei', align: 'start' },
        { value: 'tags', text: 'Tags' },
        { value: 'actions', align: 'end'}
      ],
      description: '',
      tags: [],
      documentfile: null,
      states: [
        'Rechnung', 'Lieferschein', 'Dokumentation', 'Anleitung', 'Lizenzinformation'
      ]
    }
  },
  methods: {
    splitItems(items: string) {
      if (items) {
        return items.split(';');
      } else {
        return '';
      }
      },
      DeleteDocument(document: Document) {
        (this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${document.filename}?`, { color: 'red' }).then((confirm) => {
          if (confirm === true) {
            api.delete(`/${this.type}/${this.id}/documents/${document.id}`).then(() => {
              this.LoadDocuments();
            });
          }
        });
      },
     FormattedDate(dateValue: string) {
          return new Date(dateValue).toISOString().substring(0,10);
      },
    SaveDocument() {

 const formData = new FormData();

        // files
        if (this.documentfile) {
          formData.append("document", this.documentfile, this.documentfile.name);
        }
        
        
        // additional data
        formData.append('tags', this.tags.join(';'));
        formData.append('description', this.description);



      api.post(`/${this.type}/${this.id}/documents`, formData).then(() => {
        this.LoadDocuments();
        this.description = '';
        this.tags = [];
        this.documentfile = null;
      }).catch(err => {
        console.log(err);
      });
    },

    LoadDocuments() {
      api.get(`/${this.type}/${this.id}/documents`).then((response) => {
        this.documentItems = response.data;
      }).catch(err => {
        console.log(err);
      });
    }
   
  },
  created() {
    this.LoadDocuments();
  }
});
</script>