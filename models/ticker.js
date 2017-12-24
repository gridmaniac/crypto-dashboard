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
    },
    date: {
        type: Date,
        dafault: Date.now
    }
})

module.exports = mongoose.model('Ticker', schema)