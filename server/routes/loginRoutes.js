const express = require('express');
const router = express.Router();
const controller = require('../controllers/LoginController')

router.post('/register', async (req, res, next) => {
    try {
        const result = await controller.registerUser(req.body);
        res.status(201).json(result); 
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(409).send('User already exists');
        }
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await controller.loginUser(req.body);
        res.json(result);
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).send('Invalid email or password');
        }
        next(error);
    }
});


module.exports = router;

