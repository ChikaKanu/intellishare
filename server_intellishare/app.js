const express = require("express");
const app = express();
const mongoose = require('mongoose');
const mealsRoute = require('./routes/inventoryRouter');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//middlewares
app.use('/meals', mealsRoute);

// ROUTE - home
app.get('/', (req, res) => {
    res.send('We are on home page')
});


//connect to database
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}) 
.then(() => console.log('connected to DB'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
});

//How do we start listening to server
app.listen(3000);



