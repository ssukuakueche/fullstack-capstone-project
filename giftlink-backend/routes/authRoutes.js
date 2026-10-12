
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pino = require('pino');
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const connectToDatabase = require("../models/db");

dotenv.config();

const router = new Router();

const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res)=>{
    const { firstName, lastName, email, password } = req.body;
    const db = await connectToDatabase();

    const collection = db.collection('users');

    const exists = await collection.findOne({ email });
    if (exists)
    {
        res.status(409).json({
            message: 'User already exists'
        })
        return ;
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const user = await collection.insertOne({
        firstName,
        lastName,
        email, 
        password: hash,
        createAt: new Date()
    });

     logger.info('User registered successfully');

    const token = jwt.sign({
        email: user.email, 
        id: user._id
    }, JWT_SECRET);

    res.json({
        accessToken: token,
        user: {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
    })

})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('users');

    const user = collection.findOne({ email });
    if (!user)
    {
        res.status(404).json({
            message: 'User not found'
        });
        return ;
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    if (hash != user.password)
    {
        res.status(401).json({
            message: 'Invalid password'
        });
        return ;
    }
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, JWT_SECRET);

    res.json({
        accessToken: token,
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    })

})

module.exports = router;