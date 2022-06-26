const express = require('express');
const Menu = require('../models/Menu');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
const Products = require('../models/Products');



const router = express.Router();

/**
 * @route GET/ api/courses
 * @description Get List of courses
 * @access Private
 */

router.get('/', auth, async (req, res) => {
    console.log(req.user.id)
    const menu = await Products.find({ user_id: req.user.id });
    if (!menu) {
        res.status(404).send('Ooops required item is not existing in the server');
        return;
    }
    res.send(menu);
});


router.delete('/:id', auth, async(req, res) => {
    
   try {
    
       await Products.findOneAndDelete({_id:req.params.id})
       const menu = await Products.find({user_id:req.user.id})
       res.send(menu)
   } catch (error) {
    res.status(500).send({error})
   }
},);
// Schema Validation 
const MenuValidationSchema = Joi.object({
    title: Joi.string()
        .min(1).max(50).required(),
    subTitle: Joi.string().min(1).max(50).required(),
    description: Joi.string().required().max(3000),
    date: Joi.date(),
    price: Joi.number().required().min(1).max(10000),
    Quantity: Joi.number().required().min(1).max(10000),
    Unit: Joi.string().required().min(1).max(10000),
    user_id: Joi.objectId(),

});
module.exports = router;