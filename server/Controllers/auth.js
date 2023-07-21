import User from "../Models/user.js";
import { encryptPassword, verifyPassword } from "../Utils/password.js";
import jwt from 'jsonwebtoken';



export const SignUp=async(req,res)=>{
    try{
     
      const {username,email,password}=req.body;
      console.log(username,email,password);
      const exist=await User.findOne({email:email.toLowerCase()});
      if(exist){
        return res.json({
          status:"error",
            message:"Email Already Exist"
        });
      }
      const hashedPassword=await encryptPassword(password);

      const user=new User({username,email,password:hashedPassword});
      const result=await user.save();
      return res.json({status:"success",message:"User created successfully"})

    }catch(err){
        console.log(err);
        res.status(500).json({
          status:"error",
            message:"Internal Server Error"
        })
    }
}


export const login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({
      email:email.toLowerCase()
    }).select('+password');
   if(user){
    const hashedPassword=user.password;
    const isPasswordMatch=await verifyPassword(password,hashedPassword);
    if(isPasswordMatch){
      const result=user.toObject();
      delete result.password;
      const token=jwt.sign(result,process.env.JWT_SECRET_KEY);
      res.cookie('token',token);
      res.json({status:"success",message:"Login success",result,token})
    }else{
      res.status(404).json({status:"error",message:"Email or Password doesn't match"})
    }

   }else{
    res.status(404).json({status:'error',message:"User not registered"});
   }
  }catch(err){
    console.log(err);
    res.status(500).json({
      error:"Internal Server Error"
    })
  }
}
