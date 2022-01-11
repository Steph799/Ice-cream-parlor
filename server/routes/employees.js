const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/employee');
const userAuth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { processFailed, defaultRounds, successfulUserDelete } = require('../shared/constants');
const bcrypt = require('bcrypt');


// Get all users- only admin can see all
router.get('/', [userAuth, admin], async (req, res) => {
    try {
        const employees = await Employee.find().sort('lastName');
        res.send(employees);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

// Get user by id 
router.get('/:id', [userAuth], async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id).select('-password'); //exclude the password property
        if (!employee) return res.status(400).send(idNotFound);

        res.send(employee);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

router.post('/', [userAuth, admin], async (req, res) => {
    try {
        let employee = await Employee.findOne({ id: req.body.id });
        if (employee) return res.status(400).send('Employee already registered');

        const { firstName, lastName, id, email, phone, address, role, hireDate, birthDate, password, isAdmin } = req.body;
        const { code, phoneNum } = phone
        const phoneFormat = `${code}-${phoneNum}`
        const { city, streetName, houseNum, zipCode } = address;
        const addressFormat = `${streetName} ${houseNum}, ${city}${zipCode ? `. Zip code: ${zipCode}` : ``}`

        employee = new Employee({
            firstName: firstName, lastName: lastName, id: id, email: email, phone: phoneFormat, address: addressFormat,
            role: role, hireDate: hireDate, birthDate: birthDate, isAdmin: isAdmin
        });

        console.log(employee);
        const salt = await bcrypt.genSalt(defaultRounds);
        employee.password = await bcrypt.hash(password, salt);

        await employee.save();
        const token = employee.generateEmployeeToken();
        res.header('x-auth-token', token).send(employee);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

router.delete('/:id', [userAuth, admin], async (req, res) => {
    try {
        const reqId = req.params.id;
     
        // Validate id parameter (format)
        const isObjectIdValid = mongoose.isValidObjectId(reqId);
        if (!isObjectIdValid) return res.status(400).send(userNotFound);

        // Check if user exists
        const isExists = Employee.exists({ _id: reqId });
        if (!isExists) return res.status(400).send(idNotFound);

        await Employee.deleteOne({ _id: reqId });
        return res.status(200).send(successfulUserDelete);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

router.put('/:id', [userAuth, admin], async (req, res) => {
    try {
        const isObjectIdValid = mongoose.isValidObjectId(req.params.id);
        if (!isObjectIdValid) return res.status(400).send(userNotFound);

        if (req.body.password) {
            //only if the user changes its password
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const {phone, address } = req.body;
        const { code, phoneNum } = phone
        const phoneFormat = `${code}-${phoneNum}`
        const { city, streetName, houseNum, zipCode } = address;
        const addressFormat = `${streetName} ${houseNum}, ${city}${zipCode ? `. Zip code: ${zipCode}` : ``}`

        const formatEmployee = { ...req.body}
        formatEmployee.phone = phoneFormat
        formatEmployee.address = addressFormat  
        const employee = await Employee.findByIdAndUpdate(req.params.id, formatEmployee, { new: true, runValidators: true });
   
        if (!employee) return res.status(404).send(idNotFound);

        res.send(employee);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

module.exports = router; 