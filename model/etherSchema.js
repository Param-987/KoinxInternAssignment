
const mongoose  = require("mongoose")

const ether = new mongoose.Schema({
    name:String,
    price:Number
})

const Ether = mongoose.model("Ether",ether)

module.exports = Ether