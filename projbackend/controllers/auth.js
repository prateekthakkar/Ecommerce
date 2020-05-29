const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()[0].param
        });
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};

exports.signin = (req, res) => {
    const error = validationResult(req)
    const { email, password } = req.body;
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()[0].param
        });
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'user does not exists'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: "email or password do not match"
            })
        }
        // create auth token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            // put token in cookie
        res.cookie("token", token, { expire: new Date() + 999 });
        // send response to front end
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "Signout Successfully"
    });
};

// protected route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});
//custom middlewares