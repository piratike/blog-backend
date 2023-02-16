/**
 * Model of Comment Class.
 * 
 */

const Mongoose = require('mongoose');

const CommentSchema = new Mongoose.Schema({
    article: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = Comment = Mongoose.model('Comment', CommentSchema);
