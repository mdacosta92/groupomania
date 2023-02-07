const Post = require('../model/post');

exports.likePost = (req, res, next) => {
	Post.findOne({_id: req.params.id})
		.then((postObject) => {
			if (
				!(postObject.usersLiked.includes(req.user._id) || postObject.usersDisliked.includes(req.user._id)) &&
				req.body.like === 1
			) {

				Post.updateOne({_id: req.params.id},
					{
						$inc: {likes: 1},
						$push: {usersLiked: req.user._id}
					}
				)
					.then(res.status(201).json({message: "post likée"}))
					.catch((error) => res.status(500).json({error}));

			} else if (
				!(postObject.usersDisliked.includes(req.user._id) || postObject.usersLiked.includes(req.user._id)) &&
				req.body.like === -1
			) {

				Post.updateOne({_id: req.params.id},
					{
						$inc: {dislikes: 1},
						$push: {usersDisliked: req.user._id}
					}
				)
					.then(res.status(201).json({message: "post dislikée"}))
					.catch((error) => res.status(500).json({error}));

			} else if (postObject.usersLiked.includes(req.user._id) && req.body.like === 0) {

				Post.updateOne({_id: req.params.id},
					{
						$inc: {likes: -1},
						$pull: {usersLiked: req.user._id}
					}
				)
					.then(res.status(201).json({message: "like enlevé"}))
					.catch((error) => res.status(500).json({error}));

			} else if (postObject.usersDisliked.includes(req.user._id) && req.body.like === 0) {
				Post.updateOne({_id: req.params.id},
					{
						$inc: {dislikes: -1},
						$pull: {usersDisliked: req.user._id}
					}
				)
					.then(res.status(201).json({message: "dislike enlevé"}))
					.catch((error) => res.status(500).json({error}));

			} else {
				res.status(400).json({message: 'bad request'});
			}

		}).catch((error) => res.status(404).json({error}));
};