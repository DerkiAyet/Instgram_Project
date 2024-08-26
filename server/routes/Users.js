const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

const { Users } = require("../models");
const { validateToken } = require('../Middlewares/AuthMiddleware');

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
            error: "This Account doesn't exist"
        })
    } else {
        bcrypt.compare(password, userFound.password).then((match) => {
            if (!match) {
                res.status(400).json({
                    error: "Wrong Password "
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

router.get('/verify', validateToken, async(req, res) => {

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

module.exports = router;