/**
 * Service to create Articles.
 * 
 */

const Article = require('../models/Article.js');

module.exports = class ArticleCreator {

    static createArticle(data, callback) {

        try {

            // Create the Article in the database
            Article.create({
                title: data.title,
                body: data.body,
                user: data.user_id
            }, function(err, article) {

                if(err)
                    callback(false);

                else
                    callback(article);

            });

        } catch {

            callback(false);

        }

    }

}
