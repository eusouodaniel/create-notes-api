const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(this.password, 10, 
        (err, hashedPassword) => {
            if (err)
                next(err);
            else {
                this.password = hashedPassword;
                next();
            }
        })
    } else {
        next();
    }
})

module.exports = mongoose.model('User', userSchema);