const mongoose=require("mongoose");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
    }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true,
            },
        }
    ],
    
});
//hashing pswd using pre for register
userSchema.pre('save',async function (next){
    console.log('pre called');
    if(this.isModified('password')) {
   this.password=await bcrypt.hash(this.password,12);
   this.cpassword=await bcrypt.hash(this.cpassword,12);
   //pwd should await for hashing
    }
    next();
});

//generating token(as userschema is instance(obj) for schema class we use .methods)
userSchema.methods.generateAuthToken=async function (){
    try{
let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;

    }
    catch(err){
        console.log(err);
    }
}

//storing message in db
userSchema.methods.addMessage= async function(namevalue, email, phone , message){
try{
//both key and value are same here
    this.messages=this.messages.concat({name:namevalue, email, phone , message});
    await this.save();
    return this.messages;
}catch(err){
    console.log(err);
}
}

//creeating model
const User= mongoose.model("NEWUSER",userSchema);
module.exports=User;