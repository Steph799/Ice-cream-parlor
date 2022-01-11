const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment');
const { processFailed, defaultRounds, orderDeleted } = require('../shared/constants');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    console.log(req.body)
    const { order, buyer } = req.body
    const { weight, flavors, price, time } = order
    const { firstName, lastName, id, phone, address, payment } = buyer
    const { code, phoneNum } = phone
    const { city, streetName, houseNum, zipCode } = address
    const { nameOnCard, cardNum, expireDate } = payment
    const orderData = `Weight: ${weight}kg. Flavors: ${flavors}`
    const orderObj = { details: orderData, price: Number(price), time: time }
    const buyerObj = {
        firstName: firstName, lastName: lastName, id: id, phone: `${code}-${phoneNum}`,
        address: `${streetName} ${houseNum}, ${city}.${zipCode ? ` Zip code: ${zipCode}` : ``}`, cardHolder: nameOnCard,
        creditNum: cardNum, expiryDate: expireDate
    }
    const cardNumArr = cardNum.split('-')
    const lastDigits = cardNumArr[3] //1111-2222-3333-xxxx
  
    try {
        const shipment = new Shipment({ order: orderObj, buyer: buyerObj });

        //res.send(shipment)
        const salt = await bcrypt.genSalt(defaultRounds);
        shipment.buyer.creditNum = await bcrypt.hash(shipment.buyer.creditNum, salt);

        await shipment.save();
        const token = shipment.generateCreditCardToken();
        res.send({ token, lastDigits});
        //delete the last digits in the front

    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const reqId = req.params.id;

        // Validate id parameter (format)
        const isObjectIdValid = mongoose.isValidObjectId(reqId);
        if (!isObjectIdValid) return res.status(400).send("Order wasn't found");

        // Check if user exists
        const isExists = Shipment.exists({ _id: reqId });
        if (!isExists) return res.status(400).send("Order doesn't exist");
        
        await Shipment.deleteOne({ _id: reqId });
        return res.status(200).send(orderDeleted);
    } catch (error) {
        res.status(500).send(`${processFailed} ${error.message}`);
    }
});


module.exports = router;
