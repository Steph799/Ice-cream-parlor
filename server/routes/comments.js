const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { processFailed } = require('../shared/constants');


router.get('/', async (req, res) => {
    try {  
        const comments = await Comment.find().sort("date")
        res.send(comments);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

router.get('/last', async (req, res) => {
    try {
        const lastComment = await Comment.find().sort({date: -1}).limit(1)
        console.log("check", lastComment)
        res.send(lastComment);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

router.post('/', async (req, res) => {
    const { title, content, rate, name } = req.body
    try {   
        const comment = new Comment({ title: title, content: content, rate: rate, name: name, date: new Date() });
        await comment.save();
        res.send(comment);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

module.exports = router;
