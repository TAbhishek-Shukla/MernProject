//to verify we need to verify  token, therefore we need jwt.verify()
const jwt=require("jsonwebtoken");
const User=require('../model/userSchema');

const Authenticate=  async (req,res,next)=>{
      try{
        console.log("about auth called");
        //geting token from cookie and verifyig with sect key(verifuser wil have user all data)
      const token=req.cookies.jwtoken;
      console.log(`auth token : ${token}`);
      const verifyuser= jwt.verify(token,process.env.SECRET_KEY);
      //by using verifyuser data finding for user if exists
      const rootUser= await User.findOne({_id:verifyuser._id,"tokens.token":token});
      if(!rootUser){
        throw new Error({err:"user not found"});
      }
      //else user exists
      req.token=token;
      req.rootUser=rootUser;
      req.userID=rootUser._id;

      next();
      }
      catch(err){
        res.status(401).send("unauthorised:no user token");
        console.log(err);
      }


}
module.exports=Authenticate;