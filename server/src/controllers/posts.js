const Post = require('../models/post-model')

exports.post_add = (req, res) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description
    })
    post.save((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({
          success: true,
          message: `Post with ID_${data._id} saved successfully!`
        })
      }
    })
}

exports.posts_get_all = (req, res) => {
    Post.find({}, 'title description', (err, posts) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ posts: posts })
      }
    }).sort({ _id: -1 })
}

exports.post_get_id = (req, res) => {
    Post.findById(req.params.id, 'title description', (err, post) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send(post)
      }
    })
}

exports.post_put_id = (req, res) => {
    Post.findById(req.params.id, 'title description', (err, post) => {
      if (err) {
        console.log(err)
      } else {
        if (req.body.title) {
          post.title = req.body.title
        }
        if (req.body.description) {
          post.description = req.body.description
        }
        post.save(err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
          }
        })
      }
    })
}

exports.post_delete = (req, res) => {
    Post.remove({ _id: req.params.id }, err => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
}
   