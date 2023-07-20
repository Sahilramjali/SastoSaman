import User from "../Models/user.js";
import { hashPasswod } from "../Utils/password.js";




export const SignUp=async(req,res)=>{
    try{
      const {username,email,password}=req.body;
      const exist=await User.findOne({email:email.toLowerCase()});
      if(exist){
        return res.json({
            error:"Email Already Exist"
        });
      }
      const hashedPassword=await hashPasswod(password);

      const user=new User({username,email,password:hashedPassword});
      const result=await user.save();
      return res.json({success:"User created successfully"})

    }catch(err){

        res.status(500).json({
            error:"Internal Server error"
        })
    }
}



