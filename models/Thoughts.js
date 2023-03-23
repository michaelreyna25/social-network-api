const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thoughts', thoughtSchema);

module.exports = Thought;