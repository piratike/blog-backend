/**
 * Service to list Articles.
 * 
 */

const Article = require('../models/Article.js');
const LikeFinder = require('../services/LikeFinder.js');
const CommentFinder = require('../services/CommentFinder.js');
const Like = require('../models/Like.js');

module.exports = class ArticleFinder {

    static findArticleByTitle(title, callback) {

        try {

            // Search for the Article title in the database
            return Article.findOne({ title: title }, function(err, article) {

                if(err || !article)
                    callback(false);

                else
                    callback(article);

            });

        } catch {

            callback(false);

        }

    }

    static findArticleById(id, callback) {

        try {

            // Search for the Article ID in the database
            return Article.findOne({ _id: id }, function(err, article) {

                if(err || !article)
                    callback(false);

                else
                    callback(article);

            });

        } catch {

            callback(false);

        }

    }

    static findAllArticles(callback) {

        try {

            // Search for the Articles in the database
            return Article.find({}, function(err, articles) {

                if(err)
                    callback(false);

                else {

                    let new_articles = [];

                    articles.forEach(article => {
                        new_articles.push({
                            _id: article._id,
                            title: article.title,
                            body: article.body,
                            created_at: article.created_at,
                            updated_at: article.updated_at,
                            likes: 0
                        });
                    });

                    LikeFinder.findAllLikes(function(likes) {

                        if(!likes)
                            callback(false);

                        else {

                            let likes_list = [];

                            for(let i = 0 ; i < likes.length ; i++) {

                                if(likes_list[likes[i].article._id])
                                    likes_list[likes[i].article._id]++;

                                else
                                    likes_list[likes[i].article._id] = 1;

                            }

                            new_articles.forEach(article => {

                                if(likes_list[article._id])
                                    article.likes = likes_list[article._id];

                            });

                            callback(new_articles);

                        }

                    });

                }

            });

        } catch {

            callback(false);

        }

    }

}