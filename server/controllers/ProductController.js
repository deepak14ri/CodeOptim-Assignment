const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { id, product_name, price, quantity } = req.body;
        const product = new Product({ id, product_name, price, quantity });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { product_name, price, quantity } = req.body;
        const product = await Product.findByIdAndUpdate(productId, { product_name, price, quantity }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const { Types } = require('mongoose');

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
};
