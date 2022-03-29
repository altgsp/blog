<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <Loading v-if="loading"/>
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Voltar para a página de
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Resetar Senha</h2>
        <p>Esqueceu a senha? Insira seu email para resetá-la</p>
        <div class="inputs">
          <div class="input">
            <input type="text"
                   placeholder="Email"
                   v-model="email">
            <email class="icon"/>
          </div>
        </div>
        <button v-on:click.prevent="resetPassword">Resetar</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg"

import Modal from "../components/Modal.vue"
import Loading from "../components/Loading.vue"

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'ForgotPassword',
  components: {
    email,
    Modal,
    Loading
  },
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: '',
      loading: null,
    }
  },
  methods: {
    resetPassword() {
      this.loading = true
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.modalMessage = 'Se sua conta existir, você receberá um email'
        this.loading = false
        this.modalActive = true
      }).catch((err) => {
        this.modalMessage = err.message
        this.loading = false
        this.modalActive = true
      })
    },
    closeModal() {
      this.modalActive = !this.modalActive
      this.email = ''
    }
  }
};
</script>

<style>
.reset-password {
  position: relative;
}

.form-wrap .reset h2 {
  margin-bottom: 8px;
}

.form-wrap .reset p {
  text-align: center;
  margin-bottom: 32px;
}

</style>
