const mongoose = require('mongoose');
const { re, reqString, reqName, emailFormatError, matchedEmailFormat} = require('../shared/constants');

const validateEmail = (email) => re.test(email)

const messageSchema = new mongoose.Schema({
    name: reqName,
    email: {
        type: String, required: true, trim: true, lowercase: true, unique: true,
        validate: [validateEmail, emailFormatError], match: [matchedEmailFormat, emailFormatError]
    },
    message: reqString,
    subscribe: {type: Boolean, default: false}, 
    subject: { type: String, required: true, default: 'General'},
});

module.exports = Message = mongoose.model('Message', messageSchema);   