const express = require("express");
const app = express();
const mongoose = require('mongoose');
const mealsRoute = require('./routes/inventoryRouter');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use('/meals', mealsRoute);

// ROUTE - home
app.get('/', (req, res) => {
    res.send('We are on home page')
});

//connect to database
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
}) 
.then(() => console.log('connected to DB'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
});

//How do we start listening to server
app.listen(3000);



