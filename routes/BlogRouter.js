/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/UserController.js');
// const RequestController = require('../controllers/RequestContoller.js');

Router.post('/users', UserController.createNewUser);
Router.get('/users/:userEmail', UserController.getUser);

// Router.get('/testing', UserController.isAuthenticated, function(req, res) {
//     RequestController.sendSuccess(res, 'HI PUSHIE');
// });

module.exports = Router;
