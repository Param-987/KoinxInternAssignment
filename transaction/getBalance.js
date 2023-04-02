
const { model } = require('mongoose');
const transaction = require('../model/addresschema');
const ispresent = require('./getTransaction');
 
const getBalance = async (address) =>{
    const p = await ispresent(address)
    const sum =  p['transaction'].reduce((a,b)=>{
                if(b['isError'] === "1")return a;
                else if(b['from'] === address) return a-Number(b['value'])
                else return a+Number(b['value'])
                    },0)
     return JSON.stringify({
        address,
        balance:sum
    })
}

module.exports = getBalance;