const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const Favourite = require('../models/Favourite');
const User = require('../models/User');




const router = express.Router();


router.get('/', auth, async (req, res) => {
    
try{
    const user=await User.findOne({_id:req.user.id})
    console.log(user)
    console.log(user.fav)
    res.send(user.fav)
}catch(error){
    res.json({msg:"error",error:error})
}
    
});

router.post('/:id', auth, async (req, res) => {
try {
    console.log(req.user.id)
    await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { fav: req.params.id } },

    )
    const user= await User.findOne({_id:req.user.id})
    res.send(JSON.stringify(user.fav))
    
} catch (error) {
    console.log(error)
    res.json(JSON.stringify({msg:error}))
}
    
});



router.delete('/:id', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        await User.updateMany(
            { _id: req.user.id },
            { $pull: { fav: req.params.id } },
    
        )
        const user= await User.findOne({_id:req.user.id})
        res.send(JSON.stringify(user.fav))
        
    } catch (error) {
        console.log(error)
        res.json(JSON.stringify({msg:error}))
    }
        
    });
    
module.exports = router;