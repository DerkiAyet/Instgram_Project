const express = require('express');
const router = express.Router();

const { Likes } = require('../models');
const { validateToken } = require('../Middlewares/AuthMiddleware');

router.post('/add-like', validateToken, async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;

    try {

        const like = await Likes.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        })

        if (!like) {
            await Likes.create({
                userId: userId,
                postId: postId
            })

            res.status(201).json({
                messageAdd: 'the like has been added successfuly'
            })
        } else {
            await like.destroy();

            res.status(200).json({
                messageRmv: 'the like has been removed'
            })
        }

    } catch (error) {

        res.status(500).json({
            error: 'Internal server error'
        })

    }
})

router.get('/user-liked-posts', validateToken, async(req, res) => {
    const userId = req.user.userId;

    try {
        
        const LikedPosts = await Likes.findAll({
            where: {
                userId: userId
            }
        })
    
        const LikedPostsIds = LikedPosts.map((like) => like.postId);
    
        res.status(200).json(
            LikedPostsIds
        )

    } catch (error) {
        
        res.status(500).json({
            error: 'Internal server error'
        })

    }   
})

module.exports = router;