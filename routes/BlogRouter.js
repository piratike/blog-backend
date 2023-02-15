/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/UserController.js');
const AuthenticationMiddleware = require('../middleware/Authentication.js');
const ArticleController = require('../controllers/ArticleController.js');

// Login endpoints
Router.post('/users', UserController.createNewUser);
Router.get('/users/:userEmail', UserController.getUser);

// Articles endpoints
Router.post('/articles', AuthenticationMiddleware.isAuthenticated, ArticleController.createNewArticle);
Router.get('/articles', ArticleController.getAllArticles);
Router.get('/articles/:articleId', ArticleController.getArticle);
Router.put('/articles/:articleId', AuthenticationMiddleware.isAuthenticated, ArticleController.updateArticle);

module.exports = Router;
