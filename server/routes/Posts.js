const express = require('express');
const router = express.Router();

const { Posts, sequelize } = require('../models')

const multer = require('multer');
const { validateToken } = require('../Middlewares/AuthMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/addpost', validateToken, upload.single('postImg'), async (req, res) => {

    const userId = req.user.userId;
    const postImg = `posts/${req.file.filename}`;
    let postText = req.body.postText;

    // Convert empty string to null
    if (postText === '') {
        postText = null;
    }

    try {

        const newPost = await Posts.create({
            userId: userId,
            postImg: postImg,
            postText: postText
        })

        res.status(201).json({
            newPost
        })

    } catch (error) {

        res.status(500).json({
            error: "Internal server Error"
        })

    }

})


router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(SELECT userName FROM Users WHERE Users.userId = Posts.userId)`),
                    'userName'
                ],
                [
                    sequelize.literal(`(SELECT userImg FROM Users WHERE Users.userId = Posts.userId)`),
                    'userImg'
                ],
                [
                    sequelize.literal(`(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Posts.postId)`),
                    'commentCount'
                ],
                [
                    sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.postId = Posts.postId)`),
                    'likesCount'
                ]
            ]
        },
        order: [
            ['postId', 'DESC'] // Sort by postId in descending order
        ]
    });

    res.json(listOfPosts);
})

router.get('/user_posts/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {

        const userPosts = await Posts.findAll({
            where: {
                userId: userId
            },
            attributes: {
                include: [
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Posts.postId)`),
                        'commentCount'
                    ],
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.postId = Posts.postId)`),
                        'likesCount'
                    ]
                ]
            },
        })

        res.status(200).json(userPosts)

    } catch (error) {

        res.status(500).json({
            error: 'Internal Server Error'
        })

    }
})

router.delete('/delete-post/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId;

    try {

        await Posts.destroy({
            where: {
                postId: postId
            }
        })

        res.status(200).json({
            message: 'post deleted'
        })

    } catch (error) {

        res.status(500).json({
            error: 'Internal server error'
        })

    }
})

module.exports = router;