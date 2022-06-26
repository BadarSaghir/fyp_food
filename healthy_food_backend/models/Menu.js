const mongoose = require('mongoose');
const { number } = require('@hapi/joi');

const MenuSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ImagePlaceholder: {
        type: Array,
        default: 'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg'
    },
    price: {
        type: Number,
    },
    currency: {
        type: String,
        default: "PKR"
    },
    Quantity: {
        type: Number,
    },
    Unit: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
    Status: {
        type: Number,
        // 1 Instock 0 Outof stock
        default: 1
    },
    // act as a forign key
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]



});

module.exports = mongoose.model('Menu', MenuSchema);