const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require('morgan');
const cors=require('cors')

const db = require("./config/database");

// Test DB
db.authenticate()
    .then( () => console.log('Database connected...') )
    .catch( err =>  console.log('Error: '+err) )

const app = express();
app.use(cors())
app.options('*', cors());
// for test purposes
app.use(morgan('dev'));
app.use(express.json());
app.use('/gigs',require('./routes/gigs'));
const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));