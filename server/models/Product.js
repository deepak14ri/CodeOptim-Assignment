const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
