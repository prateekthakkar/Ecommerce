const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 50
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });

//Virtualfield [password]
userSchema.virtual("password")
    .set(function(password) {
        // store password in private varible.
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password
    });
// create method
userSchema.methods = {
    // authenticate user and matching password
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },
    // encrypt password 
    securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema)