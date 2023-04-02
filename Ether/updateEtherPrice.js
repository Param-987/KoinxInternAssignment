const mongoose  = require("mongoose")
const Ether = require("../model/etherSchema")
const { etherPrice } = require("./etherBalance")


const updateEtherPrice = async() =>{
    const data = await etherPrice()
    const updated_data = await Ether.findOneAndUpdate({name:"Ether"},{price:data['ethereum']['inr']},{
        new:true
    })
    console.log("Ether Price updated")
}

module.exports = updateEtherPrice