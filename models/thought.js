const { Schema, model } = require('mongoose');
const userSchema = require('./user');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String,
            required: true,
            // must be between 1-280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [],
        reactions: [],
    },
    { 
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;