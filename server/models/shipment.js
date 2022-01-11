const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { reqString, CreditCardLength, reqName, minPrice, minId, maxId, idMsg } = require('../shared/constants');

const shipmentSchema = new mongoose.Schema({
    order: { details: reqString, price: { type: Number, min: minPrice, required: true }, time: reqString },
    buyer: {
        firstName: reqName,
        lastName: reqName,
        id: { type: Number, min: minId, max: maxId, validate: { validator: Number.isInteger, message: idMsg}, required: true },
        cardHolder: reqName,
        creditNum: { type: String, minlength: CreditCardLength, required: true },
        expiryDate: reqString,
        phone: reqString,  //code (number) - phone number    ('03-1234567')
        address: reqString  //street+house number + city +zip code (optional)
    },
});


shipmentSchema.methods.generateCreditCardToken = function () {
    const shipment = this;
    const { order, buyer } = shipment
 
    return jwt.sign(
        {
            _id: shipment._id,
            details: order.details,
            price: order.price,
            time: order.time,
            firstName: buyer.firstName,
            lastName: buyer.lastName,
            id: buyer.id,
            phone: buyer.phone,
            address: buyer.address, 
            cardHolder: buyer.cardHolder,
            expiryDate: buyer.expiryDate,           
        }, process.env.jwtPrivateKey
    );
};


module.exports = Shipment = mongoose.model('Shipment', shipmentSchema);