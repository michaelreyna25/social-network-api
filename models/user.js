const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

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
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [thoughtSchema],
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

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;