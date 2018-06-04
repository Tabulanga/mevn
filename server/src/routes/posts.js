const express = require('express')
const router = express.Router()
const PostsControllers = require('../controllers/posts')

router.post('/posts', PostsControllers.post_add)
router.get('/posts', PostsControllers.posts_get_all)
router.get('/posts/:id', PostsControllers.post_get_id)
router.put('/posts/:id', PostsControllers.post_put_id)
router.delete('/posts/:id', PostsControllers.post_delete)

module.exports = router