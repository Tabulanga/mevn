<template lang="pug">
    .container
        .row
            .col-xl-12
                h1
                    | Edit post
                section.edit
                    form( @submit.prevent="editPost()" )
                        .form-group
                            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="post.title" )
                        .form-group
                            textarea.form-control( type="text", rows="5", name="description", id="description", placeholder="Description", v-model.trim="post.description" )
                        .form-group
                            button.btn.btn-block.btn-primary.app_post_btn( type="submit", name="editPost" )
                                | Edit post
                        section
                            router-link( :to="{ name: 'Posts' }" )
                                | Go to list of posts
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'EditPostPage',
    data () {
      return {
        post: {
          title: '',
          description: ''
        }
      }
    },
    methods: {
      async getPost () {
        const response = await PostsService.getPost({ id: this.$route.params.id })
        this.post.title = response.data.title
        this.post.description = response.data.description
      },
      async editPost () {
        if (this.post.title !== '' && this.post.description !== '') {
          await PostsService.updatePost({
            id: this.$route.params.id,
            title: this.post.title,
            description: this.post.description
          })
          this.$router.push({ name: 'Posts' })
        }
      }
    },
    mounted () {
      this.getPost()
    }
  }
</script>
<style type="text/css">
.form-group input, .form-group textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
  margin: auto;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
  margin: auto;
}
</style>