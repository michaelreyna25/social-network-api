const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');
const reactionSchema = require('./reaction');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trimmed: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,

        },
        thoughts: [thoughtSchema],
        friends: [friendsSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;