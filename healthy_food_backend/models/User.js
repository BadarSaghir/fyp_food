const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    fav:{
        type:Array,
        required:false,
        unique:true,
        default:[]

    },
    role: {
        type: String,
        default: 'user'
    },
    imageAvatar: {
        type: String,
        default: 'https://guarded-shelf-88919.herokuapp.com/api/learner/avatar/defaultAvatar.svg'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        State: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    }, isVerified: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);