
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pino = require('pino');
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const connectToDatabase = require("../models/db");

const { body, validationResult } = require('express-validator');

dotenv.config();

const router = new Router();

const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const db = await connectToDatabase();

    const collection = db.collection('users');

    const exists = await collection.findOne({ email });
    if (exists) {
        res.status(409).json({
            message: 'User already exists'
        })
        return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    const name = `${firstName} ${lastName}`;

    const user = await collection.insertOne({
        name,
        email,
        password: hash,
        createAt: new Date()
    });

    logger.info('User registered successfully');

    const token = jwt.sign({
        email,
        id: user._id
    }, JWT_SECRET);

    res.json({
        accessToken: token,
        user: {
            name,
            email
        }
    })

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('users');

    const user = await collection.findOne({ email });
    if (!user) {
        res.status(404).json({
            message: 'User not found'
        });
        return;
    }

    if (!(await bcryptjs.compare(password, user.password))) {
        res.status(401).json({
            message: 'Invalid password'
        });
        return;
    }
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, JWT_SECRET);

    res.json({
        accessToken: token,
        user: {
            name: user.name,
            email: user.email
        }
    })

})
router.put('/update', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array(), message: 'Fields invalids' });
        return;
    }

    const { email } = req.headers;

    if (!email) {
        res.status(400).json({ message: 'Email not found in the request headers' });
        return;
    }

    const db = await connectToDatabase();
    const collection = db.collection('users');
    const user = collection.findOne({ email });

    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }
    const { name } = req.body;
    user.createAt = new Date();
    user.name = name;
    const updatedUser = await collection.findOneAndUpdate(
        { email },
        { $set: user },
        { returnDocument: 'after' }
    );

    const token = jwt.sign({
        email: updatedUser.email,
        id: updatedUser._id
    }, JWT_SECRET);

    res.json({
        accessToken: token,
        user: {
            name: updatedUser.name,
            email: updatedUser.email
        }
    })
})

module.exports = router;