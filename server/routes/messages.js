const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const { processFailed, msgSent } = require('../shared/constants');

router.post('/', async (req, res) => {
    const { subject, subscribe, issue, name, email } = req.body
    try {
        const newMessage = new Message({ name: name, email: email, message: issue, subscribe: subscribe, subject: subject});
        await newMessage.save();
        res.send(msgSent);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

module.exports = router;
