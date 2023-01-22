const Post = require('../model/post');

exports.likePost = (req, res, next) => {
    console.log("-->CONTENU req.body.like - ctrl like")
    console.log(req.body.like)

    console.log("-->CONTENU req.body.userId - ctrl user")
    console.log(req.body.userId)

    console.log('--> id en _id')
    console.log({ _id: req.params.id })

    Post.findOne({ _id: req.params.id })
        .then((postObject) => {

            if (!postObject.usersLiked.includes(req.body.userId) && req.body.like === 1) {

                Post.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                ).then()(res.status(201).json({ message: "post likée" })
                ).catch((error) => res.status(500).json({ error }));

            } else if (postObject.usersLiked.includes(req.body.userId) && req.body.like === 0) {

                Post.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                ).then()(res.status(201).json({ message: "like enlevé" })
                ).catch((error) => res.status(500).json({ error }));
                
            } else if (!postObject.usersDisliked.includes(req.body.userId) && req.body.like === -1) {

                Post.updateOne({ _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                ).then()(res.status(201).json({ message: "post dislikée" })
                ).catch((error) => res.status(500).json({ error }));

            } else {
                res.status(400).json({ message: 'bad request' })
            }

        }).catch((error) => res.status(404).json({ error }))
}