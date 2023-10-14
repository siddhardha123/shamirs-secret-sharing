const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    user_name: String,
    password: String,
    share_count: Number,
    threshold: Number,
});

module.exports = mongoose.model('User', userSchema);
