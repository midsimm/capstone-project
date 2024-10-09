const express = require('express');
const router = express.Router();

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if(userExists) {
            res.send({
                success: true,
                message: "User already exists"
            });
        }
    } catch (err) {
        console.log(err);
    }

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
        success: true,
        message: "User registered successfully"
    }); 
});

module.exports = router;