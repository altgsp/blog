<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <p class="content-preview" v-else>{{ post.blogHTML }}</p>
        <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
          Login / Cadastrar-se<Arrow class="arrow arrow-light2" />
        </router-link>
        <router-link class="link" v-else to="#">
          Veja o Post<Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
      <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt="">
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"

export default {
  name: 'BlogPost',
  props: ['post'],
  components: {
    Arrow,
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
};
</script>

<style scoped>
.link {
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: .5s ease-in all;
}

.link:hover {
  border-bottom-color: #303030;
}

.link-light:hover {
  border-bottom-color: #fff;
}

.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}

.blog-photo {
  order: 1;
  flex: 3;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-content div {
  max-width: 375px;
  padding: 72px 24px;
}

.blog-content h2 {
  font-size: 32px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.blog-content p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
}

.content-preview {
  font-size: 13px;
  max-height: 24px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blog-wrapper:nth-child(even) .blog-content{
  order: 2;
}

.blog-wrapper:nth-child(even) .blog-photo{
  order: 1;
}

.arrow {
  margin-left: 8px;
  width: 12px;
}

.arrow path {
  fill: #000;
}

.arrow-light path {
  fill: #000;
}

.arrow-light2 path {
  fill: #fff;
}

.no-user:first-child .blog-content{
  background-color: #303030;
  color: #fff;
}

@media (min-width: 700px) {
.blog-wrapper {
  min-height: 650px;
  max-height: 650px;
  flex-direction: row;
}

.blog-content {
  order: 1;
}

.blog-content div {
  padding: 0 24px;
}

.blog-content h2 {
  font-size: 40px;
}

.blog-photo {
  order: 2;
}
}

@media (min-width: 800px) {
.blog-content {
  flex: 3;
}

.blog-photo {
  flex: 4;
}
}
</style>
