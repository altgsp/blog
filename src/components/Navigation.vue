<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">front-news 💻</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Posts</router-link>
          <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Criar Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login / Cadastrar-se</router-link>
        </ul>
        <div v-if="user" v-on:click="toggleProfileMenu" class="profile" ref="profile">
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon"/>
                  <p class="icon__text">Perfil</p>
                </router-link>
              </div>
              <div v-if="admin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon"/>
                  <p class="icon__text">Admin</p>
                </router-link>
              </div>
              <div v-on:click="signOut" class="option">
                <signOutIcon class="icon"/>
                <p class="icon__text">Sair</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
    <div class="mobile-nav" name="mobile-nav">
      <ul v-show="mobileNav">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Posts</router-link>
          <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Criar Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Cadastrar-se</router-link>
      </ul>
    </div>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg"
import userIcon from "../assets/Icons/user-alt-light.svg"
import adminIcon from "../assets/Icons/user-crown-light.svg"
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg"

import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: 'Navigation',
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    admin() {
      return this.$store.state.profileAdmin
    },
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },
    signOut() {
      firebase.auth().signOut()
      window.location.reload()
    }
  }
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: .3s color ease;
}

.link:hover {
  color: #1eb8b8;
}

nav {
  display: flex;
  padding: 25px 0;
}

.branding {
  display: flex;
  align-items: center;
}

.header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}

.nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}

.nav-links ul {
  margin-right: 32px;
}

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
}

.profile-menu {
  position: absolute;
  top: 60px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #fff;
}

.initials {
  position: initial;
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.right {
  flex: 1;
  margin-left: 24px;
}

.right p:nth-child(1) {
  font-size: 14px;
}

.right p:nth-child(2),
.right p:nth-child(3) {
  font-size: 12px;
}

.options {
  padding: 15px;
}

.option {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.option:last-child {
  margin-bottom: 0px;
}

.icon {
  width: 18px;
  height: auto;
}

.icon__text {
  font-size: 14px;
  margin-left: 14px;
}

.nav-links .link {
  margin-right: 32px;
}

.nav-links:last-child {
  margin-right: 0;
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav ul {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}

.mobile-nav .link {
  padding: 15px 0;
  color: #fff; 
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px)
}

.mobile-nav-enter-to {
  transform: translateX(0)
}

.mobile-nav-leave-to {
  transform: translateX(-250px)
}
</style>