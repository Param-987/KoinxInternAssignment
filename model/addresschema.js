const mongoose = require('mongoose')

const Transaction = new mongoose.Schema({
    address:String,
    transaction:[{
        from:String,
        to:String,
        value:Number,
        isError:String,
    },]
})

const transaction = mongoose.model('Transaction',Transaction)

module.exports = transaction