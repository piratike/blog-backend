/**
 * Main file for the API.
 * Modules importations and app initialization.
 * 
 */

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const Mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const routes = require(__dirname + '/routes/BlogRouter.js');
const app = express();

Mongoose.connect(MONGO_URI);

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

module.exports = app;
