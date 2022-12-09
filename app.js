/**
 * Main file for the API.
 * Modules importations and app initialization.
 * 
 */

const express = require('express');
const bodyParser = require("body-parser");
const routes = require(__dirname + '/routes/BlogRouter.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

module.exports = app;
