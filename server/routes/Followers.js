const express = require('express');
const { validateToken } = require('../Middlewares/AuthMiddleware');
const router = express.Router();
const { Followers } = require('../models');

router.post('/add_follow', validateToken, async(req, res) => {
    const followerId = req.user.userId;
    const followingId = req.body.followingId;

    try {

        await Followers.create({
            followerId: followerId,
            followingId: followingId
        })
    
        res.status(201).json({
            message: 'SUCCESS'
        })
        
    } catch (error) {
        
        res.status(500).json({
            error: 'Interenal server error'
        })

    }
})

router.delete('/remove_follow/:followingId', validateToken, async(req, res) => {
    const followerId = req.user.userId;
    const followingId = req.params.followingId;

    try {
        
        await Followers.destroy({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        })
    
        res.status(200).json({
            message: 'the folllow has been deleted with success'
        })

    } catch (error) {
        
        res.status(500).json({
            error: 'Internal server error'
        })

    }
})

router.delete('/remove-follower/:followerId', validateToken, async(req, res) => {
    const userId = req.user.userId;
    const followerId = req.params.followerId;

    try {
        
        await Followers.destroy({
            where: {
                followerId: followerId,
                followingId: userId
            }
        })

        res.status(200).json({
            message: 'deleted with success'
        })

    } catch (error) {
        
        res.status(500).json({
            error: 'Internal server error'
        })

    }
})

module.exports = router;