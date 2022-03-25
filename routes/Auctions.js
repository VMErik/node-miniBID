// This is fot the authentication for use the API
const express = require('express');
const router = express.Router();
// Import the model for user, Auction, and Item
const User = require('../models/User');
const Auction = require('../models/Auction');
const Item = require('../models/Item');

// Import the validations
const { auctionValidation } = require('../validations/validation')
    // Imports Libraries
var ObjectId = require('mongodb').ObjectId;
const verifyToken = require('../verifyToken');



router.post('/add', verifyToken, async(req, res) => {

    // Validate the body
    const { error } = auctionValidation(req.body);
    // If the error exists
    if (error) {
        // Extract the message and send to the user 
        res.status(400).send({ message: error['details'][0]['message'] });
        return;
    }
    // Validate the user id
    const existUser = await User.findOne({ _id: ObjectId(req.user._id) })
    if (!existUser) {
        res.status(400).send({ message: "The user id is not valid" });
        return;
    }
    // Validate the item id
    const existItem = await Item.findOne({ _id: ObjectId(req.body.auction_itemid) })
    if (!existItem) {
        res.status(400).send({ message: "The item id is not valid" });
        return;
    } else {
        // The user must be diferent to user id in the body
        if (existItem.item_user === req.user._id) {
            res.status(400).send({ message: "The action is not allowed on own products" });
            return;
        }
        // Validate item status 
        if (existItem.item_status !== "Open") {
            res.status(400).send({ message: "The action is not allowed on closed products" });
            return;
        }
    }

    // Calculate the time left in time
    const nowDate = Date.now();
    const endDate = new Date(existItem.item_auctionexpiration);
    let timeDifference = (endDate - nowDate);


    // All its ok, then we save the info
    const auction = new Auction({
        auction_itemid: req.body.auction_itemid,
        auction_userid: req.user._id,
        auction_price: req.body.auction_price,
        auction_timeleft: timeDifference
    });

    try {
        const savedAuction = await auction.save();
        res.send(savedAuction);
        return;
    } catch (error) {
        res.status(400).send({ message: error.message });
        return;
    }
})



router.get('/close', async(req, res) => {

    let itemsClosed = 0;
    // Select all the auctions and close by date
    for await (const item of Item.find({ item_status: 'Open', item_auctionexpiration: { $lt: Date.now() } })) {
        // Interact with the collection back and start checking auctions
        const itemId = item._id.toString()
        const winnerAuction = await Auction.findOne({ auction_itemid: itemId }).sort({ auction_price: -1 }).limit(1);

        if (winnerAuction) {

            // Update the best auction to auction winner true
            winnerAuction.auction_winner = true;
            await winnerAuction.save();

            // Exist a winner Auction
            // Get the auction price and the user id
            const auction_price = winnerAuction.auction_price;
            const auction_userid = winnerAuction.auction_userid;
            item.item_auctionwiner = auction_userid;
            item.item_winnerprice = auction_price;
            item.item_status = "Closed";
            itemsClosed++;
            // Save the changes
            await item.save();
        }
    }

    res.send({ message: "Items Closed : " + itemsClosed })
    return;
})


router.get('/ById', verifyToken, async(req, res) => {

    try {
        const auctions = await Auction.find({ auction_itemid: req.body.itemid });
        res.send(auctions);
    } catch (error) {
        // Asign the status to the error and send the error
        res.status(400).send(error.message);
    }

})



module.exports = router;