const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const { findById } = require('../models/Order');
Joi.objectId = require('joi-objectid')(Joi);
const validate = require('../util/mangoId-Validator');


const router = express.Router();


router.get('/', auth, async (req, res) => {
    try{
        let itemsData=[];
        const orders = await Order.find({ "OrderItems.OrderTo": req.user.id });
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

router.put('/:id/:status', async (req, res) => {
    try {
        const coursetopic = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    OrderStatus: req.params.status,
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


module.exports = router;