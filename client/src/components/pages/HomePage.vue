<template lang="pug">
  .container
    .row
      .col-xl-12
        h1
          | Blog
        router-link( :to="{ name: 'NewPost' }" )
            | Add new post 
        || 
        router-link( :to="{ name: 'Posts' }" )
            | Admin`s panel
        br
        br
        section( v-for="(post, index) in posts", :key="post.title" )
            h3 {{ post.title }}
            p {{ post.description }}
            br
</template>
<script>
import PostsService from '@/services/PostsService'
  export default {
    name: 'HomePage',
    data () {
      return {
        posts: []
      }
    },
    methods: {
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      }
    },
    mounted () {
      this.getPosts()
    }
  }    
</script>