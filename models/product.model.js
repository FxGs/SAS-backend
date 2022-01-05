const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    inventory: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    name: {
        type: String, 
        required: true,
        unique: true,
    },
    description: {
        type: String, 
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);