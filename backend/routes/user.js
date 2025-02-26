const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
})

router.post('/signup', async(req, res) => {
   const { success }= signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
          message: "Invalid input / Email already in use"
        })
    }
    const existingUser = await User.findOne({ 
      username: req.body.username 
    })
    if(existingUser){
        return res.status(411).json({
            message: "Invalid input / Email already in use"
        })
    }
    const user= await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ 
      message: "User created successfully",
      token: token
     });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})
router.post('/signin', async(req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid input"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if(user){
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token });
    }
    res.status(411).json({
        message: "error while signing in"
    });
});


module.exports = router;