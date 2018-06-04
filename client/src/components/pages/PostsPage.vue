<template lang="pug">
  .container
    .row
      .col-xl-12
        h1
          | Posts
        h3
          | This file will list all the posts
        div
          router-link( :to="{ name: 'NewPost' }" )
            | Add new post 
          || 
          router-link( :to="{ name: 'Home' }" )
            | Home Page 
        br
        section.panel.panel-success( v-if="posts.length" )
          table.table.table-striped
            tr
              th Title
              th Description
              th Action
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ post.title }}
              td {{ post.description }}
              td 
                router-link( :to="{ name: 'EditPost', params: { id: post._id } }" )
                  | Edit 
                || 
                a(href="", @click="removePost(post._id)" )
                  | Delete

        section.panel.panel-danger( v-else )
          p
            | There are no posts ... Lets add one now!
</template>

<script>

  import PostsService from '@/services/PostsService'
  export default {
    name: 'PostsPage',
    data () {
      return {
        posts: []
      }
    },
    methods: {
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      },
      async removePost (value) {
        await PostsService.deletePost(value)
        this.getPosts()
      }
    },
    mounted () {
      this.getPosts()
    }
  }
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
</style>