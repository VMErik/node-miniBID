const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    item_title: {
        type: String // Title 
    },
    item_user: {
        type: String // Owner
    },
    item_createdate: {
        type: Date,
        default: Date.now // Date Created
    },
    item_condition: {
        type: String // Condition
    },
    item_ownerinfo: {
        type: String // Details of the item
    },
    item_auctionexpiration: {
        type: Date, // The last day to accept auctions
    },
    item_auctionwiner: {
        type: String, // User id that wons the auctions of item
        default: ""
    },
    item_winnerprice: {
        type: Number, // Price that wons  the auctions of item ,
        default: 0
    },
    item_status: {
        type: String,
        default: "Open" // Open or Closed 
    }
})

// We have indicate the name of collection and we will export
module.exports = mongoose.model('items', itemSchema)