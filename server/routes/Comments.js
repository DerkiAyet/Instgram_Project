const express = require('express');
const router = express.Router();

const { Comments, Users } = require('../models');
const { validateToken } = require('../Middlewares/AuthMiddleware');

router.post('/add-comment', validateToken, async (req, res) => {
    const userId = req.user.userId;
    const { postId, commentText } = req.body;

    try {

        const comment = await Comments.create({
            postId: postId,
            userId: userId,
            commentText: commentText
        })

        const user = await Users.findByPk(userId)

        res.status(201).json({
            commentId: comment.commentId,
            postId: postId,
            userId: userId,
            commentText: comment.commentText,
            User: {
                userName: user.userName,
                userImg: user.userImg
            }  
        })

    } catch (error) {

        res.status(500).json({
            error: 'Internal server error',
            errorPost: `post Id ${postId}`
        })

    }
})

router.get('/by-postId/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {

        const comments = await Comments.findAll({
            where: { postId: postId },
            include: [{
                model: Users,
                attributes: ['userName', 'userImg']
            }]
        });

        res.status(200).json(
            comments
        )

    } catch (error) {

        res.status(500).json({
            error: 'Internal server error'
        })

    }
})

module.exports = router;