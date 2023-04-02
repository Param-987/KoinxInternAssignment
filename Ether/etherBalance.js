const mongoose = require("mongoose");
const Ether = require("../model/etherSchema");
const nodecron = require('node-cron');
const { default: axios } = require("axios");

const etherPrice = async()=>{
    return await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
                    .then(res=>res.data)
                    .catch((err)=> console.log("Error in retreiving ether price"))
}



const addEtherDb = async()=>{
    const price = await etherPrice()
    console.log(price)
    const data = new Ether({
        name:"Ether",
        price:price['ethereum']['inr']
    })

    return await data.save().then((res)=>{
        console.log(res,"EtherPrice added Successfully");
        return res
    }).catch((err)=>{
        console.log("Error in addig ether price")
    })
}
const getPriceEther = async() =>{
    return await Ether.findOne({name:"Ether"}).then((res)=>{
        if(res) return res;
        return addEtherDb()
    }).catch((err)=>{
        console.log("Error in ether data in db")
    })
}
module.exports ={ getPriceEther , etherPrice}





