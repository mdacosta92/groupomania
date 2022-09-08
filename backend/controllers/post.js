// in controllers/stuff.js

const Post = require('../model/post');
const fs = require('fs');
const post = require('../model/post');

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersDisliked: [],
    usersLiked: [],
    userId: req.user._id,
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
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._id,
    Post.findOne({ _id: req.params.id }).then((post) => {
      if (post.userId != req.user._id) {
        res.status(401).json({ message: 'Non-autorisé ' });
      } else {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          {
            ...postObject,
            _id: req.params.id,
          }
        ).then(() => res.status(200).json({ message: 'Post modifiée !' }));
        post.save().catch((error) => res.status(401).json({ error }));
      }
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(404).json({
        error: new Error('No such Post!'),
      });
    }
    if (post.userId !== req.user._id) {
      res.status(400).json({
        error: new Error('Unauthorized request!'),
      });
    }
    Post.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: 'Deleted!',
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

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
