/**
 * Service to list Articles.
 * 
 */

const Article = require('../models/Article.js');

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

                else
                    callback(articles);

            });

        } catch {

            callback(false);

        }

    }

}