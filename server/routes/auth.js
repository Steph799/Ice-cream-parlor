const bcrypt = require('bcrypt');
const Employee = require('../models/employee');
const express = require('express');
const router = express.Router();
const { invalid, userExist, successfulRegistered, processFailed } = require('../shared/constants');

//log in
router.post('/login', async (req, res) => {
    try {
      
        let employee = await Employee.findOne({ email: req.body.email });
        if (!employee) return res.status(400).send(invalid);
       
        const validPassword = await bcrypt.compare(req.body.password, employee.password);
        if (!validPassword) return res.status(400).send(invalid);
        const token = employee.generateEmployeeToken();
        res.send(token);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

// User register
router.post('/', async (req, res) => {
    try {
        // Validate Register 
        const { error } = Employee.validateRegister(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if user is already registered
        let employee = await Employee.findOne({ email: req.body.email });
        if (employee) return res.status(400).send(userExist);

        // Create a new user & save it
        employee = new Employee(req.body);
        const salt = await bcrypt.genSalt();
        employee.password = await bcrypt.hash(employee.password, salt);
        await employee.save();
        res.header('x-auth-token', employee.generateEmployeeToken()).status(201).send(successfulRegistered);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});

module.exports = router;
