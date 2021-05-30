<template>
  <v-container>


    <v-list two-line>
      <template v-for="(comment) in this.commentItems">

        <v-list-item

          :key="comment.id"
        >
          <v-list-item-avatar>
            <v-img src="https://i.pravatar.cc/150"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="comment.User" class="text--secondary subtitle-2"><a class="text-decoration-none" :href="GetProfileLink(comment.User)">{{ comment.User.firstname }} {{ comment.User.lastname }}</a> am {{ GetFormattedDate(comment.createdAt) }}</v-list-item-title>
            <v-list-item-title v-else class="text--secondary subtitle-2">Anonym am {{ GetFormattedDate(comment.createdAt) }}</v-list-item-title>
            <v-list-item-subtitle class="text--primary body-1" v-html="comment.content"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <form>
			<template>
				<vue-editor class="mb-4" v-model="content" :editor-toolbar="editorToolbar" />
			</template>
      <v-btn color="success" @click="SaveComment"><v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}</v-btn>
    </form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/plugins/axios";
import { mapGetters } from 'vuex'
import { User } from "@/plugins/backend";
import { VueEditor } from "vue2-editor";

export default Vue.extend({
  name: "Comments",
	components: {
		VueEditor
	},
  props: {
    type: String,
    id: Number,
  },
  data () {
    return {
      content: null,
      commentItems: null,
			editorToolbar: [
				["bold", "italic", "underline"],
				[{ list: "ordered" }, { list: "bullet" }]
			]
    }
  },

 computed: {
    ...mapGetters(['getUser', 'IsLoggedIn'])
  },

  methods: {
    GetProfileLink(user: User) {
      if (user) {
        return `/users/${user.id}/profile`;
      }
      return '';
    },
     GetFormattedDate(strDate: string) {
      const objDate = new Date(strDate);
      const arrDate = [('0' + objDate.getDate()).slice(-2), ('0' + (objDate.getMonth()+1)).slice(-2), objDate.getFullYear()];
      const arrTime = [('0' + objDate.getHours()).slice(-2), ('0' + objDate.getMinutes()).slice(-2), ('0' + objDate.getSeconds()).slice(-2)];
      return arrDate.join('.') + ' ' + arrTime.join(':');
    },
    SaveComment() {
      const userInfo = this.getUser();

      if (userInfo) {
        api.post(`/${this.type}/${this.id}/comments`, {
             content: this.content,
             userId: userInfo.id
         }).then(() => {
           this.content = null;
            this.LoadComments();
         });
      }
    },
    LoadComments() {
      api.get(`/${this.type}/${this.id}/comments`).then((response) => {
        this.commentItems = response.data;
      });
    }
  },
  mounted() {
    this.LoadComments();
  },
  created() {
    this.LoadComments();
  }
});
</script>
