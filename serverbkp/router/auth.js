const express=require("express");
const router= express.Router();
const bcrypt=require("bcryptjs");
require("../db/conn");
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const User = require("../model/userSchema");

 const authenticate= require("../middleware/authenticate");

router.get("/", (req,res)=>{
    console.log(`Hello from home page router`);
    res.send(`Hello from home page router`);
})

//router for register using promise
// router.post("/register", (req,res)=>{
//     const {name,email,phone,work,password,cpassword}=req.body;
//     console.log(name);

//    if( !name || !email || !phone || !work || !password || !cpassword){
// return res.status(422).json({error:"missing data field "});
//    }
   
//    User.findOne({email})
//    .then((userExist)=>{
//    //checking if user exist before storing data
//    console.log("checking if user exist"); 
//    if(userExist){
//     return res.status(422).json({error:"email already exist!"});   
//    }
//    //name and name are same key and value using only one time(_id:_id => _id)
//    const user=new User({name:name,email:email,phone,work,password,cpassword});
//    user.save().then(()=>{
//     res.status(201).json({msg:'registered successfully'})
//    })
//    .catch((err)=>{
//     res.status(500).json({er:'failed register'})
//    })

//    }).catch(err=>{console.log(err); })

// })

//register page using async
router.post("/register",async (req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    console.log(name);

   if( !name || !email || !phone || !work || !password || !cpassword){
return res.status(422).json({error:"missing data field "});
   }
   
   try{
    const userExist = await User.findOne({email});

    //checking if user exist before storing data
    console.log("checking if user exist"); 
    if(userExist){
     return res.status(422).json({error:"email already exist!"});   
    }else if(password !== cpassword){
        return res.status(422).json({error:"invalid data field"});
    }else{
    //name and name are same key and value using only one time(_id:_id => _id)
    const user=new User({name:name,email:email,phone,work,password,cpassword});
//hashing paswd before saving therefore using bcrypt.hash
      
     await  user.save();
    res.status(201).json({msg:'registered successfully'})
     }
   }
   catch(err)
   {
    console.log(err); 
   }
 
})


//login route

router.post("/signin", async (req,res)=>{
    // console.log(req.body);
    // res.json({msg:"awesome"});

    try{
       let token;
        const {email,password}= req.body;
//checkng if user missed field
        if(!email || !password){
            res.status(400).json({error:"missing data field!"})
        }
        //checking if user email already present or not
        const userlogin=await User.findOne({email});
        // checking if user email exists
        if(userlogin){
                //checking pwd in db 
                const isMatch= await bcrypt.compare(password,userlogin.password);

       //creating token after pswd securing using userlogin
         token=await  userlogin.generateAuthToken();
           console.log(token);

           //creating cookie and storing it using res.cookie()
           res.cookie('jwtoken',token,{
            expires:new Date(Date.now() + 30000000),
             httpOnly:this.true,
           });
          

            if(!isMatch){
            res.status(400).json({message:"invalid credentials"})
               }
            res.json({message:"user login successful"})
        }
        else{
            res.status(400).json({message:"invalid credentials"})
        }
       
    }
    catch(err){
        console.log(err);
    }
})

//about us page
router.get("/about",authenticate, (req,res)=>{
    console.log(`Hello from aboutus page`);
    res.send(req.rootUser);
})

//new route for getting data for contactus page

router.get('/getdata',authenticate, (req,res)=>{
    console.log(`Hello from contactUs `);
    res.send(req.rootUser);
})

//Contactus page
router.post("/contact",authenticate,async (req,res)=>{
  try{
   const {name,email,phone,message} = req.body;
//checking if datafield is empty
if(!name || !email || !phone || !message){
    console.log('error in contact form');
return res.json({error:'plzz fill the conact form'})
}
//checking if user exist in db
const userContact =await User.findOne({_id:req.userID});
//if user exist 
if(userContact){
const useressage=await  userContact.addMessage(name,email,phone,message);
//getting message from funct defined in schema
await userContact.save();
res.status(201).json({msg:'USer contact sucessfuly'})
}

  } 
  catch(err){
    console.log(err);
  }     
})


//Logout tpage
router.get("/logout", (req,res)=>{
    console.log(`Hello from logout page`);
    res.clearCookie('jwtoken',{
        path:'/'
    });
    res.status(200).send("User logout");
})

module.exports=router;