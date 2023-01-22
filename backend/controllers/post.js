// in controllers/stuff.js

const Post = require('../model/post');
const fs = require('fs');
const post = require('../model/post');
const user = require('../model/user');

exports.createPost = (req, res, next) => {
  const postObject = {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }

  const post = new Post({
    ...postObject,
    like: 0,
    dislike: 0,
    usersDisliked: [],
    usersLiked: [],
    userId: req.user._id,
    date: new Date()
  });
  
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPost = (req, res, next) => {

  Post.findOne({ _id: req.params.id }).then((post) => {

    if ( post.userId !== req.user._id) {
      res.status(401).json({ message: 'Non-autorisé ' });
      return;
    }

  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...JSON.parse(req.body.post), imageUrl: post.imageUrl };
console.log(req.body.post, postObject)
        Post.updateOne(
          {
            _id: req.params.id,
          },
          {
            ...postObject,
            _id: req.params.id,
          }
        ).then(() => res.status(200).json({ message: 'Post modifiée !' }));
    });
};

exports.deletePost = (req, res, next) => {
  console.log(req.user.isAdmin)
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(404).json({
        error: new Error('No such Post!'),
      });
      return
    }
    
    if ( post.userId !== req.user._id ) {
      res.status(400).json({
        error: new Error('Unauthorized request!'),
      });
      return
    } 

      Post.deleteOne({ _id: req.params.id })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        })
      })
  })

  if (req.user.isAdmin == 1) {
    Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      })
    })
  }} 

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
