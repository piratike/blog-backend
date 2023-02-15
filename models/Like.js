/**
 * Model of Like Class.
 * 
 */

const Mongoose = require('mongoose');

const LikeSchema = new Mongoose.Schema({
    article: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = Like = Mongoose.model('Like', LikeSchema);
