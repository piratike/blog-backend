/**
 * Service to update Articles.
 * 
 */

const Article = require('../models/Article.js');

module.exports = class ArticleUpdater {

    static updateArticle(data, callback) {

        try {

            // Update the Article in the database
            Article.findOneAndUpdate({
                _id: data.article_id,
                user: data.user_id
            },{
                title: data.article_title,
                body: data.article_body,
                user: data.user_id
            },
            {
                new: true
            }, function(err, article) {

                if(err)
                    callback(false);

                else
                    callback(article);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}
