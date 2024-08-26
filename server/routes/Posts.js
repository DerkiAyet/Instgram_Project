const express = require('express');
const router = express.Router();

const { Posts } = require('../models')

router.get('/', async(req, res) => {
    const listOfPosts = await Posts.findAll();

    res.json(listOfPosts);
})

module.exports = router;