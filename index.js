const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')
const nodecron = require("node-cron");

const ispresent = require('./transaction/getTransaction');
const getBalance = require('./transaction/getBalance');
const etherPrice = require('./Ether/etherBalance');
const { getPriceEther } = require('./Ether/etherBalance');
const updateEtherPrice = require('./Ether/updateEtherPrice');

const dotenv = require('dotenv');
dotenv.config(); 

mongoose.set('strictQuery',true)

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log(`Database Connected Successfully`))
.catch((e)=>(console.log(`Unsuccessful Database connection`)))

// For updating the value of ether every 10 min
nodecron.schedule('*/10 * * * *',()=>updateEtherPrice())

// callback function return the price of ether
app.get('/ether/price',async (req,res)=>{
    res.send(await getPriceEther())
})

// callback function to return all the transaction of particular address
app.get('/transaction/:add',async(req,res)=>{
    res.send(await ispresent(req.params.add)) 
})

// return the balance of an address
app.get('/balance/:add',async (req,res)=>{
    res.send(await getBalance(req.params.add))
})

app.get('/', async(req,res)=>{
    res.send(`
    <div style = "font-size:22px;font-family:Times New Roman">
    Welcome to Server Side Application to fetch Crypto Transactions of a user.<br>
    <ol>
        <li> To fetch the transaction , go to port  <a target = "_blank" style = "Color:#576CBC" href="http://localhost:3000/transaction/0xce94e5621a5f7068253c42558c147480f38b5e0d">http://localhost:3000/balance/<--address--></a> (replace address with value)</li>
        <li> To fetch the balance , go to port  <a target = "_blank" href="http://localhost:3000/balance/0xce94e5621a5f7068253c42558c147480f38b5e0d">http://localhost:3000/balance/<--address--></a>  (replace address with value)</li>
        <li> To fetch the transaction , go to port  <a target = "_blank" href="http://localhost:3000/ether/price">http://localhost:3000/ether/price</a></li>
    </ol>
    </div>
    `)
    
})

app.listen(3000,()=>{
    console.log(`Post listening on 3000`);
})


// a=cron job