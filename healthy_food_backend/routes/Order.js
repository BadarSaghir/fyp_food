const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const { findById } = require('../models/Order');
Joi.objectId = require('joi-objectid')(Joi);
const validate = require('../util/mangoId-Validator');
var ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { address, cart, price } = req.body;
    const orderItem = [];
    cart.map((item) => {
        const newItem = {
            product_Id: [new ObjectId(item.item._id)],
            quantity: item.quantity,
            OrderTo: item.item.user_id,
            OrderFrom: req.user.id
        }
        orderItem.push(newItem)
    })
    const rating={
        rating: 0,
        comment: "",
        status: false
    }
    
let prices= price
console.log(price)
    try {
        order = new Order({
            Address: address,
            OrderItems: orderItem,
            Price:prices,
            Rating: rating
        });
        await order.save();
        res.status(200).send('Order Places Successfully');
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
});


router.get('/', auth, async (req, res) => {
    try{
        let itemsData=[];
        const orders = await Order.find({ "OrderItems.OrderFrom": req.user.id });
        for (const order of orders) { 
            for (const type of order.OrderItems) {  
                itemsData.push(await Menu.find({ "_id": type.product_Id[0]}));
            }
          }
        res.json({orders: orders, itemsData:itemsData});
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: "Failure",
            msg: "Internal server error",
          });
    }
});

router.put('/rating', async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.data.id,
            {
                $set: {
                    Rating: {
                        rating: req.body.data.rating,
                        comment: req.body.data.comment,
                        status: true
                    },
                },
              },
              { new: true }
           );

        res.status(200).json({
            status: true,
            message: "Successfully updated"
        });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }

});


/*********************************Data related to orders******* */

module.exports = router;