// There are our routes
const express = require('express');
const Item = require('../models/Item');
const router = express.Router();
// Import model
const item = require('../models/Item');
const User = require('../models/User');
const { itemValidation } = require('../validations/validation');
// Import functioon to verify
const verifyToken = require('../verifyToken');
var ObjectId = require('mongodb').ObjectId;


// Verify the tken for this Route
router.get('/getAll', verifyToken, async(req, res) => {
    try {
        const items = await item.find().select('_id , item_title , item_condition , item_auctionexpiration');
        res.send(items);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error);
    }
});

router.get('/getAllDetail', verifyToken, async(req, res) => {
    try {
        const items = await item.find();
        res.send(items);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error);
    }
});

router.get('/getDetailSingle', verifyToken, async(req, res) => {
    try {
        const items = await item.findOne({ _id: ObjectId(req.body.itemid) });
        if (!items) {
            res.status(400).send({ message: 'The ItemId is not exists' })
            return
        }
        res.send(items);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error.message);
    }
});


// Get Open Items 
router.get('/getOpen', verifyToken, async(req, res) => {
    try {
        const items = await item.find({ item_status: 'Open' });
        res.send(items);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error);
    }
});



// Get Closed Items 
router.get('/getClosed', verifyToken, async(req, res) => {
    try {
        const items = await item.find({ item_status: "Closed" });
        res.send(items);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error);
    }
});


// Add new Item
router.post('/add', verifyToken, async(req, res) => {
    try {
        // Need some validations
        const { error } = itemValidation(req.body);
        // If the error exists
        if (error) {
            // Extract the message and send to the user 
            res.status(400).send({ message: error['details'][0]['message'] });
            return;
        }
        // Create the date for the auctionexpiration
        const dateExpiration = new Date(req.body.item_auctionexpiration + "T12:00:00Z")
            // Verify the expiration date not less than today
        if (dateExpiration <= new Date(Date.now())) {
            res.status(400).send({ message: "The auction expiration date must be greater than today" })
            return;
        }
        // Verify the item condition (Only :  New , Used)
        if (req.body.item_condition.toUpperCase() !== "NEW" && req.body.item_condition.toUpperCase() !== "USED") {
            res.status(400).send({ message: "The condition is not valid -  New Or Used only is accepted" })
            return;
        }
        // Validate the user id
        const user = await User.findOne({ _id: ObjectId(req.user._id) });
        if (!user) {
            res.status(400).send({ message: 'The UserId is not registered' })
            return
        }
        // Create the object user
        const item = new Item({
            item_title: req.body.item_title,
            item_user: req.user._id,
            item_condition: req.body.item_condition.toUpperCase(),
            item_auctionexpiration: dateExpiration,
            item_ownerinfo: req.body.item_ownerinfo,
            // Specify empty values
            item_auctionwiner: "",
            item_winnerprice: 0
        });
        // Save the user
        try {
            const savedItem = await item.save();
            res.send(savedItem);
            return;
        } catch (error) {
            res.status(400).send({ message: error.message });
            return;
        }
    } catch (error) {
        res.status(400).send({ message: "The body is not valid " + error.message });
        return;
    }
})

module.exports = router;