const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    provider:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required: true
    },

    price:{
        type: Number,
        required: false
    },

    reserveStatus:{
        type: Boolean,
        default: false
    },

    postDate:{
        type: Date,
        default: Date.now
    },

    reserveByDate:{
        type: Date
    },


});

module.exports = mongoose.model('meals', InventorySchema);

