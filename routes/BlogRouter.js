/**
 * File to declare all enpoints for the App.
 * 
 */

const express = require('express');
const Router = express.Router();
const AuthenticationMiddleware = require('../middleware/Authentication.js');
const UserController = require('../controllers/UserController.js');
const ArticleController = require('../controllers/ArticleController.js');
const CommentController = require('../controllers/CommentController.js');
const LikeController = require('../controllers/LikeController.js');

// Login endpoints
Router.post('/users', UserController.createNewUser);
Router.get('/users/:userEmail', UserController.getUser);

// Articles endpoints
Router.post('/articles', AuthenticationMiddleware.isAuthenticated, ArticleController.createNewArticle);
Router.get('/articles', ArticleController.getAllArticles);
Router.get('/articles/:articleId', ArticleController.getArticle);
Router.put('/articles/:articleId', AuthenticationMiddleware.isAuthenticated, ArticleController.updateArticle);
Router.delete('/articles/:articleId', AuthenticationMiddleware.isAuthenticated, ArticleController.removeArticle);

// Comments endpoints
Router.post('/comments', AuthenticationMiddleware.isAuthenticated, CommentController.createNewComment);
// Router.get('/comments/:articleId', CommentController.getCommentsFromArticle);
Router.get('/comments/:commentId', CommentController.getComment);
// Router.put('/comments/:commentId', AuthenticationMiddleware.isAuthenticated, CommentController.updateComment);
// Router.delete('/comments/:commentId', AuthenticationMiddleware.isAuthenticated, CommentController.removeComment);

// Likes endpoints
Router.post('/likes', AuthenticationMiddleware.isAuthenticated, LikeController.createNewLike);
Router.get('/likes/:articleId', LikeController.getLikesFromArticle);
Router.delete('/likes/:likeId', AuthenticationMiddleware.isAuthenticated, LikeController.removeLike);

module.exports = Router;
