const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 35
    },
    description: {
        type: String,
        require: true,
        maxlength: 1000,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        maxlength: 15,
        trim: true
    },
    category: {
        type: ObjectId,
        refernce: "Category",
        require: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    size: {
        type: String,
        trim: true,
        maxlength: 15,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);