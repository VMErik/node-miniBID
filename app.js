// Import all packages that we use
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

// Import the routes and set the route to use
const itemsRoute = require('./routes/Items');
const userRoute = require('./routes/auth');
const auctionRoute = require('./routes/Auctions');


// Use the routes
app.use('/api/items', itemsRoute);
app.use('/api/user', userRoute);
app.use('/api/auctions', auctionRoute);


// Declare the connection with mongoose
// process.env.DB_CONNECTOR is the LInk to coneect to MongoDB
mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('DB is connected')
});


app.listen(3000, () => {
    console.log('The server is runing')
});