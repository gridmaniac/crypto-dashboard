const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Number,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Balance', schema)