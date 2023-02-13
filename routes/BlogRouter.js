/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/UserController.js');
const ArticleController = require('../controllers/ArticleController.js');

// Login endpoints
Router.post('/users', UserController.createNewUser);
Router.get('/users/:userEmail', UserController.getUser);

// Protected endpoints
Router.post('/articles', UserController.isAuthenticated, ArticleController.createNewArticle);

module.exports = Router;
