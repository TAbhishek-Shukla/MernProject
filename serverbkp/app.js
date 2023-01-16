const dotenv = require('dotenv')
const express=require("express");
const mongoose = require("mongoose");
const app= express();
dotenv.config({ path :'./config.env'});
const cookieParser = require('cookie-parser');
require("./db/conn")
// const USer=require("./model/userSchema");

app.use(express.json());
//cookie parser midddleware
app.use(cookieParser());
//linked the routeer files here
app.use(require('./router/auth'));

const PORT=process.env.LPORT;




//home page
// app.get("/", (req,res)=>{
//     console.log(`Hello from home page`);
//     res.send(`Hello from home page`);
// })

//about page
// app.get("/about", (req,res)=>{
//     console.log(`Hello from aboutus page`);
//     res.send(`Hello from aboutus page`);
// })

//contact page
// app.get("/contact", (req,res)=>{
//     console.log(`Hello from contact page`);
//     // res.cookie('jwtoken1','abhishek',{
//     //     expires:new Date(Date.now() + 300000),
//     //      httpOnly:this.true,
//     //    });
//     res.send(`Hello from contact page`);
// })

//registereration page
app.get("/register", (req,res)=>{
    console.log(`Hello from signup page`);
    res.send(`Hello from signup page`);
})

//login page
app.get("/signin", (req,res)=>{
    console.log(`Hello from signin page`);
    res.send(`Hello from signin page`);
})

//listening at port
app.listen(PORT, (req,res)=>{
    console.log(`listening at : ${PORT}`);
})