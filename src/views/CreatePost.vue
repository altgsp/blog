<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
    <div class="container">
      <div :class="{invisible: !error}" class="err-message">
        <p><span>Erro: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input v-model="blogTitle" type="text" placeholder="Digite o Título">
        <div class="upload-file">
          <label for="blog-photo">Faça Upload da Imagem de Capa</label>
          <input @change="fileChange" type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg">
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
            Preview da Imagem
          </button>
          <span>Arquivo Escolhido: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" 
                    v-model="blogHTML" 
                    useCustomImageHandler
                    @image-added="imageHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="uploadPost">Publicar Post</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
window.Quill = Quill
const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)

import BlogCoverPreview from "../components/BlogCoverPreview.vue"

import firebase from "firebase/app"
import "firebase/storage"
import db from "../firebase/firebaseInit"

export default {
  name: 'CreatePost',
  components: {
    BlogCoverPreview
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        ImageResize: {},
      }
     }
  },
  computed: {
    profileId() {
      return this.$store.state.profileId
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload)
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML
      },
      set(payload) {
        this.$store.commit('newBlogPost', payload)
      }
    },
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0]
      const fileName = this.file
      this.$store.commit('fileNameChange', fileName)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },
    openPreview() {
      this.$store.commit('openPhotoPreview')
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref()
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)
      docRef.put(file).on('state_changed', (snapshot) => {
        console.log(snapshot)
      }, (error) => {
        console.log(error)
      }, async () => {
        const downloadURL = await docRef.getDownloadURL()
        Editor.insertEmbed(cursorLocation, 'image', downloadURL)
        resetUploader()
      })
    },
    uploadPost() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          const storageRef = firebase.storage().ref()
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)
          docRef.put(this.file).on('state_changed', (snapshot) => {
            console.log(snapshot)
          }, (error) => {
            console.log(error)
          }, async () => {
            const downloadURL = await docRef.getDownloadURL()
            const timestamp = await Date.now()
            const dataBase = await db.collection('blogPosts').doc()

            await dataBase.set({
              blogID: dataBase.id,
              blogHTML: this.blogHTML,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: this.blogCoverPhotoName,
              blogTitle: this.blogTitle,
              profileId: this.profileId,
              date: timestamp,
            })
            this.$router.push({ name: 'ViewBlog' })
          }
        )
          return
        }
        this.error = true
        this.errorMsg = 'Por favor, verifique se você fez upload de uma imagem de fundo!'
        setTimeout(() => {
          this.error = false
        }, 5000);
        return
      }
      this.error = true
      this.errorMsg = "Por favor, verifique se o título e o campo de texto foram preenchidos!"
      setTimeout(() => {
        this.error = false
      }, 5000);
      return
    }
  }
};
</script>

<style scoped>
.create-post {
  position: relative;
  height: 100%;
}

.create-post button {
  margin-top: 0;
}

.router-button {
  text-decoration: none;
  color: #fff;
}

label,
button,
.router-button {
  transition: 500ms ease-in-out all;
  align-self: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
}

.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7)
}

.container {
  position: relative;
  height: 100%;
  padding: 10px 25px 60px;
}

.invisible {
  opacity: 0 !important;
}

.err-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
  background-color: #303030;
  opacity: 1;
  transition: 0.5s ease all;
}

.err-message p {
  font-size: 14px;
}

.err-message span {
  font-weight: 600;
}

.blog-info {
  display: flex;
  margin-bottom: 32px;
}

.blog-info input:nth-child(1) {
  min-width: 300px;
}

input {
  transition: 0.5s ease-in-out all;
  padding: 10px 4px;
  border: none;
  border-bottom: 1px solid #303030;
}

input:focus {
  outline: none;
  box-shadow: 0 1px 0 0 #303030;
}

.preview {
  margin-left: 16px;
  text-transform: initial;
}

.preview span {
  font-size: 12px;
  margin-left: 16px;
  align-self: center;
}

.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.quillWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ql-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
}

.ql-editor {
  padding: 20px 16px 30px;
}

.blog-actions {
  margin-top: 32px;
}

.blog-actions button {
  margin-right: 16px;
}

</style>
