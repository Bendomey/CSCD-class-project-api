const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config({path: '.env'});
const PORT = 5000 || process.env.PORT;

//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then( ()=> {
       console.log('Database connected');
    })
    .catch(err => {
        throw err;
    });

//import models
require('./models/user');
require('./models/department');
require('./models/hall');
require('./models/room');

//create instance of express
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(validator());

//routes
app.use('/api', require('./routes'));

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});