var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")


router.post("/signup", [
    check("name", "Name should be a at least 3 character!").isLength({ min: 3 }),
    check("email", "Email should be a require!").isEmail(),
    check("password", 'The password must be 5+ chars long and contain a number')
    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
    .isLength({ min: 5 })
    .matches(/\d/)
], signup);

router.post("/signin", [
    check("email", "Email should be a require!").isEmail(),
    check("password", 'The password must be required.').isLength({ min: 2 })
], signin);

router.get("/signout", signout);

module.exports = router;