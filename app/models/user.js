var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    type: {
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.path('email').validate(function (email) {
    return email.length >= 5 && email.length <= 60;
});

UserSchema.path('type').validate(function (type) {
    return type === 'user';
});

UserSchema.path('password').validate(function (password) {
    return password.length > 5 && password.length <= 40;
});

UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')){
        return next();
    }
    bcrypt.hash(user.password, null, null, function(err, hash, next){
       if(err){
           return next(err);
       }
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);