/**
 * Service to delete Articles.
 * 
 */

const Article = require('../models/Article.js');

module.exports = class ArticleRemover {

    static deleteArticle(data, callback) {

        try {

            // Remove the Article from the database
            Article.findOneAndRemove({
                _id: data.article_id,
                user: data.user_id
            }, function(err, article) {

                if(err)
                    callback(false);

                else
                    callback(article);

            });

        } catch (error) {

            callback(false);

        }

    }

}
