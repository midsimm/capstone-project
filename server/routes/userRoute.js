const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

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

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = await User(req.body);
        await newUser.save();
    
        res.send({
            success: true,
            message: "User registered successfully"
        }); 
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.send({
                success: false,
                message: "You are not registered. Please register first"
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({userId: user._id}, `${process.env.SECRET_KEY}`, { expiresIn: "1h" });

        return res.send({
            success: true,
            message: "Logged in successfully",
            data: user,
            token: token
        })

    } catch (err) {
        console.log(err);
    }
});

router.get("/get-current-user", authMiddleware, async(req, res) => {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
        data: user,
        message: "User fetched successfully",
        success: true
    })
});
module.exports = router;