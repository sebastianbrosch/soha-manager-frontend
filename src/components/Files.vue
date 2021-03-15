<template>
  <v-container>
    <v-data-table :headers="this.fileHeaders" :items="this.fileItems">
      <template v-slot:[`item.mime`]="{ item }" >
          <v-icon v-if="item.mime == 'application/pdf'">mdi-file-pdf-outline</v-icon>
          <v-icon v-else>mdi-file-outline</v-icon>
  </template>
      <template v-slot:[`item.actions`]="{ item }">
           <v-btn v-if="item.static_filename" icon :href="`https://192.168.0.143:9001/static/files/${item.static_filename}`" :download="`${item.filename}`">
            <v-icon  >mdi-file-download-outline</v-icon>
          </v-btn>
       <v-btn icon @click="DeleteFile(item)">
            <v-icon >mdi-delete-outline</v-icon>
          </v-btn>
    </template>
    </v-data-table>
    <form>
        <v-text-field v-model="description" label="Description"></v-text-field>
        <v-file-input v-model="file" accept=".exe"></v-file-input>
      <v-btn color="success" @click="SaveFile"><v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}</v-btn>
    </form>
    <ConfirmDialog ref="confirm"></ConfirmDialog>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import api from "../plugins/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { File } from "@/plugins/backend";

export default Vue.extend({
  name: "Files",
  components: {
    ConfirmDialog
  },
  props: {
    type: String,
    id: Number,
  },
  data () {
    return {
      fileItems: [],
      fileHeaders: [
        { value: 'mime', align: 'start', width: 15 },
        { value: 'filename', text: 'File' },
        { value: 'description', text: 'Description'},
        { value: 'actions', align: 'end'}
      ],
      file: null,
      description: '',
    }
  },
  methods: {
      DeleteFile(file: File) {
        (this.$refs.confirm as Vue & { open: (title: string, message: string, options: object) => Promise<boolean>}).open('Delete', `Are you sure you want to delete ${file.filename}?`, { color: 'red' }).then((confirm) => {
          if (confirm === true) {
            api.delete(`/${this.type}/${this.id}/files/${file.id}`).then(() => {
              this.LoadFiles();
            });
          }
        });
      },
    SaveFile() {

 const formData = new FormData();

        // files
        if (this.file) {
          formData.append("file", this.file, this.file.name);
          formData.append('description', this.description);
        }

      api.post(`/${this.type}/${this.id}/files`, formData).then(() => {
        this.LoadFiles();
        this.file = null;
      });
    },

    LoadFiles() {
      api.get(`/${this.type}/${this.id}/files`).then((response) => {
        this.fileItems = response.data;
      });
    }
   
  },
  created() {
    this.LoadFiles();
  }
});
</script>