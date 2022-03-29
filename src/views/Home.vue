<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>Veja os Posts Mais Recentes</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Não perca nenhum post. Cadastre uma conta grátis hoje mesmo!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue"
import BlogCard from "../components/BlogCard.vue"

export default {
  name: 'Home',
  components: {
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome',
        blogPost:
          'Blog diário com todas as notícias relevantes do mundo da programação front-end, atualizações e dicas sobre HTML, CSS, JavaScript e muito mais. Registre-se hoje para não perder as postagens',
        welcomeScreen: true,
        photo: 'beautiful-stories'
      },
      sampleBlogPost: [
        {
          title: 'Produtividade em ação!',
          blogHTML: '10 dicas para o aumento de produtividade utilizando frameworks.',
          blogCoverPhoto: 'coding'
        },
        {
          title: 'Guia do código limpo.',
          blogHTML: 'Como otimizar seus códigos e melhorar o trablho em grandes equipes.',
          blogCoverPhoto: 'designed-for-everyone'
        },
      ],
    }
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
    user() {
      return this.$store.state.user
    }
  },
}
</script>

<style scoped>
.blog-card-wrap h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.updates .container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
}

.updates h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}

@media (min-width: 800px) {
  .updates .container {
    padding: 125px 25px;
    flex-direction: column;
  }

  .router-button {
    margin-left: auto;
  }

  .updates h2 {
    text-align: initial;
    font-size: 40px;
  }
}
</style>
