const { Schema, model } = require('mongoose');
const Thought = require('./Thoughts');

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
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);




userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;