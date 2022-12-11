/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/UserController.js');

Router.post('/users', UserController.createNewUser);
Router.get('/users/:userEmail', UserController.getUser);

module.exports = Router;
