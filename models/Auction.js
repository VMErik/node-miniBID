const mongoose = require('mongoose')

const auctionSchema = mongoose.Schema({
    auction_itemid: {
        type: String // Item id
    },
    auction_userid: {
        type: String // User that makes the auction
    },
    auction_price: {
        type: Number // Price of the auction
    },
    auction_date: {
        type: Date,
        default: Date.now // Date of the auction
    },
    auction_timeleft: {
        type: Number // Time left to finish the auction phase
    },
    auction_winner: {
        type: Boolean, // Boolean to know if the auction was a winner,
        default: false
    }
})

// We have indicate the name of collection and we will export
module.exports = mongoose.model('auctions', auctionSchema)