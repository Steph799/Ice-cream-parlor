const mongoose = require('mongoose');

const { reqString, reqName, maxRate } = require('../shared/constants');

const commentSchema = new mongoose.Schema({
    title: reqName,
    content: reqString,
    rate: { type: Number, min: 0, max: maxRate},
    name: reqName,
    date: {type: Date}
});

module.exports = Comment = mongoose.model('Comment', commentSchema);