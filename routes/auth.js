// This is fot the authentication for use the API
const express = require('express');
const router = express.Router();
// Import the model
const User = require('../models/User');
// Import the validations
const { registerValidation, loginValidation } = require('../validations/validation')
    // Imports Libraries
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

router.post('/register', async(req, res) => {
    // Need some validations
    const { error } = registerValidation(req.body);
    // If the error exists
    if (error) {
        // Extract the message and send to the user 
        res.status(400).send({ message: error['details'][0]['message'] });
        return;
    }
    //Make the validation for user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400).send({ message: 'User already exists' });
        return;
    }
    // Encrypt the password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // In case the error not exists and the user not exists
    // Create the object user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        // Set the encrypted password
        password: hashedPassword
    });
    // Save the user
    try {
        const savedUser = await user.save();
        res.send(savedUser);
        return;
    } catch (error) {
        res.status(400).send({ message: error });
        return;
    }
});

router.post('/login', async(req, res) => {

    // Need some validations
    const { error } = loginValidation(req.body);
    // If the error exists
    if (error) {
        // Extract the message and send to the user 
        res.status(400).send({ message: error['details'][0]['message'] });
        return;
    }

    //Make the validation for user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ message: 'User does not exist' });
        return;
    }

    // Validate the password
    const passworValidation = await bcryptjs.compare(req.body.password, user.password);
    if (!passworValidation) {
        res.status(400).send({ message: 'Password is not valid' });
        return;
    }

    // We will generate the token and the returns to the user
    const token = jsonwebtoken.sign({
        _id: user.id,
    }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({ 'auth-token': token });
    return;
});


module.exports = router;