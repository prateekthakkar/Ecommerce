const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: objectId,
        ref: "Product"
    },
    name: {
        type: String,
        count: Number,
        price: Number,
        size: String,
        photo: Buffer
    }
}, { timestamps: true });
const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: objectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports { ProductCartSchema, Order }