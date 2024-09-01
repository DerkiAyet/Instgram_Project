const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

const { Users, Followers, Posts, sequelize } = require("../models");
const { validateToken } = require('../Middlewares/AuthMiddleware');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/accounts/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {

    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);

})

router.post('/signup', async (req, res) => {
    const { email, fullName, userName, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        try {

            const newUser = await Users.create({
                userName: userName,
                email: email,
                FullName: fullName,
                password: hashedPassword,
                userImg: null,
                gender: null,
                birthDate: null,
                bio: null
            })

            const accessToken = sign(
                {
                    userId: newUser.userId,
                    userName: userName
                },
                'ImportantSecret'
            )

            res.status(201).json({
                msg: "SUCCESS",
                token: accessToken
            })
        } catch (error) {

            if (error.name === "SequelizeUniqueConstraintError") {
                if (error.errors.some(e => e.path === 'userName')) {
                    res.status(400).json({
                        error: "This userName already exists."
                    });
                } else if (error.errors.some(e => e.path === 'email')) {
                    res.status(400).json({
                        error: "This email address is already registered."
                    });
                } else {
                    res.status(400).json({
                        error: "A unique constraint error occurred."
                    });
                }
            } else {
                res.status(500).json({
                    error: "An unexpected error occurred."
                });
            }

        }
    } catch (error) {

        res.status(500).json({
            error: "an error occcurred while hashing the password"
        })

    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userFound = await Users.findOne({
        where: {
            email: email
        }
    });

    if (!userFound) {
        res.status(400).json({
            userError: "This Account doesn't exist"
        })
    } else {
        bcrypt.compare(password, userFound.password).then((match) => {
            if (!match) {
                res.status(400).json({
                    passwordError: "Wrong Password "
                })
            } else {
                const accessToken = sign(
                    {
                        userId: userFound.userId,
                        userName: userFound.userName
                    },
                    'ImportantSecret'
                )

                res.status(201).json({
                    msg: "Login with SUCCESS",
                    token: accessToken,
                    fullName: userFound.FullName,
                    userName: userFound.userName,
                    userImg: userFound.userImg
                })
            }
        })
    }
})

router.get('/verify', validateToken, async (req, res) => {

    const userId = req.user.userId;

    const user = await Users.findByPk(userId, {
        attributes: ['userImg', 'FullName']
    })

    res.json({
        userName: req.user.userName,
        userImg: user.userImg,
        fullName: user.FullName
    })

})

router.get('/get_infos', validateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const userInfos = await Users.findByPk(userId);

        const listOfFollowers = await Followers.findAll({
            where: {
                followingId: userId
            }
        });

        const listOfFollowees = await Followers.findAll({
            where: {
                followerId: userId
            }
        });

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
            }
        });

        const listOfFollowersIds = listOfFollowers.map((follower) => follower.followerId);
        const listOfFolloweesIds = listOfFollowees.map((followee) => followee.followingId);

        res.status(200).json({
            user: {
                userName: userInfos.userName,
                fullName: userInfos.FullName,
                userImg: userInfos.userImg,
                bio: userInfos.bio
            },
            listOfFollowersIds,
            listOfFolloweesIds,
            posts: userPosts
        });

    } catch (error) {
        console.error('Error fetching user information:', error); // Logs detailed error information
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


router.get('/infos_byUsername/:userName', async (req, res) => {
    const userName = req.params.userName;

    try {

        const user = await Users.findOne({
            where: {
                userName: userName
            }
        });

        const followersCount = await Followers.count({
            where: {
                followingId: user.userId
            }
        })

        const followeesCount = await Followers.count({
            where: {
                followerId: user.userId
            }
        })

        const posts = await Posts.findAll({
            where: {
                userId: user.userId
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

        res.status(200).json({
            user: {
                userId: user.userId,
                userName: userName,
                fullName: user.FullName,
                userImg: user.userImg,
                posts,
                followersCount,
                followeesCount
            }
        })

    } catch (error) {

        res.status(500).json({
            error: 'Interenal Server Error'
        })

    }
})

router.get('/edit-infos', validateToken, async (req, res) => {
    const userId = req.user.userId;

    try {

        const user = await Users.findByPk(userId);

        res.status(200).json({
            userInfos: {
                userName: user.userName,
                fulName: user.FullName,
                userImg: user.userImg,
                bio: user.bio,
                gender: user.gender,
                birthDate: user.birthDate
            }
        })

    } catch (error) {

        res.status(500).json({
            error: 'Interenal Server Error'
        })

    }
})

router.put('/edit-profile', validateToken, upload.single('userImg'), async (req, res) => {
    const userId = req.user.userId;
    const userImg = req.file ? `accounts/${req.file.filename}` : null;
    const { bio, gender, birthDate } = req.body;

    try {

        const user = await Users.findByPk(userId);
        if (!user) {
            res.status(400).json({
                error: 'user not found'
            })
        }

        // that allows to make a partial modification
        if (userImg) user.userImg = userImg;
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (birthDate) user.birthDate = birthDate;

        await user.save();

        res.status(201).json(
            user
        )

    } catch (error) {

        res.status(500).json({
            error: 'Interenal Server Error'
        })

    }
})

router.get('/user_followers_and_followees', validateToken, async (req, res) => {
    const userId = req.user.userId;

    try {

        const user = await Users.findByPk(userId, {
            include: [
                {
                    model: Users,
                    as: 'Follower', // alias from belongsToMany check the Users model
                    attributes: ['userId', 'userName', 'FullName', 'userImg'],
                    through: { attributes: [] }, // exclude junction table fields cause Sequelize uses a junction table to store the association between the models Users and Followers
                },
                {
                    model: Users,
                    as: 'Following', // alias from belongsToMany check the Users model
                    attributes: ['userId', 'userName', 'FullName', 'userImg'],
                    through: { attributes: [] }, // exclude junction table fields cause Sequelize uses a junction table to store the association between the models Users and Followers
                }
            ],
        });

        const followers = user.Follower;
        const followees = user.Following

        res.status(200).json({
            followers: followers,
            followees: followees
        })

    } catch (error) {

        res.status(500).json({
            error: 'Interenal Server Error'
        })

    }
})

module.exports = router;