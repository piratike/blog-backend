/**
 * Model of Article Class.
 * 
 */

const Mongoose = require('mongoose');

const ArticleSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = Article = Mongoose.model('Article', ArticleSchema);
