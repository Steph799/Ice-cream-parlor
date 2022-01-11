const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { re, reqString, reqName, minId, maxId, emailFormatError, matchedEmailFormat, idMsg, passwordLength } = require('../shared/constants');

const validateEmail = (email) => re.test(email)

const employeeSchema = new mongoose.Schema({
    firstName: reqName,
    lastName: reqName,
    id: { type: Number, min: minId, max: maxId, required: true, unique: true, validate: { validator: Number.isInteger, message: idMsg } },
    email: {
        type: String, required: true, trim: true, lowercase: true, unique: true,
        validate: [validateEmail, emailFormatError], match: [matchedEmailFormat, emailFormatError]
    },
    phone: reqString,
    address: reqString,
    role: reqString,
    hireDate: { type: Date, required: true },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true, minLength: passwordLength, unique: true },
    isAdmin: { type: Boolean, default: false }
});

employeeSchema.methods.generateEmployeeToken = function () {
    const employee = this;

    return jwt.sign(
        {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            id: employee.id,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            role: employee.role,
            hireDate: employee.hireDate,
            birthDate: employee.birthDate,
            isAdmin: employee.isAdmin,
        }, process.env.jwtPrivateKey
    );
};

module.exports = Employee = mongoose.model('Employee', employeeSchema);
