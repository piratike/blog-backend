/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const UserCreator = require('../controllers/UserCreator.js');

Router.post('/users', UserCreator.createNewUser);

module.exports = Router;
