const { default: axios } = require("axios")
const mongoose = require("mongoose")
const transaction = require('../model/addresschema')
require('dotenv').config()

// This function will retreive transaction data from api and will add it to db
const getData = async (address)=>{
    return await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&&address=${address}&sort=asc&apikey=${process.env.API_KEY}`)
    .then(async (res)=>{
        const dataToAdd = new transaction({
            address:address,
            transaction:res.data['result']
        })
        return await dataToAdd.save()
        .then((doc)=>{
            console.log(`Entry Added Successfully`)
            return doc;
        }).catch((e)=> console.log(`Error Occured in adding the data`,e))

    }).catch((err)=>{
        console.log("Error occured in retreiving transaction data",err);
    })
}
/* Will check if transaction data is present in db or not.If not found calls getData funtion  */
const ispresent = async address => await transaction.findOne({address:address}).then(async (res)=>{
        if(res) return res
        return await getData(address)
    })
    .catch((err)=>{
        return JSON.stringify({
            status:'0',
            message:"Unable to access transaction , Try again with diff address"
        })
    }) 

module.exports = ispresent