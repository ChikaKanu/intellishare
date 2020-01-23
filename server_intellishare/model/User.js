const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        max: 255,
        min: 0

    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },

    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },

    address: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },

    postcode: {
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('users', userSchema);