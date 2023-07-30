import cart from "../Models/cart.js";

import jwt from 'jsonwebtoken';
export const addCart=async(req,res)=>{
    try{

        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        )
        const userId=token._id;
        const{productId,quantity}=req.body;
        if(userId){
            if(quantity==0){
                await cart.findOneAndDelete({userId,productId});
                return res.json({
                    status:'success',
                    message:'Product removed'
                })
            }
            const updateCart=await cart.findOneAndUpdate(
                {productId,userId},
                {quantity},
                {new:true}
            )
            if(updateCart){
                return res.json(updateCart);
            }
            const newCartItems=new cart({userId,productId,quantity});
            const result=await newCartItems.save();
           
            return res.json({status:"success",newCartItems:newCartItems})
        }else{
            return res.json({status:"error",message:"Operation failed"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Server error"})
    }
}

export const removeItemFromCart=async(req,res)=>{
    try{
        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        );
        const userId=token._id;
        const productId=req.params.productId;
        if(userId){
            await cart.findOneAndDelete({userId,productId});
            
            
            return res.json({status:"success"})
        }else{
            return res.json({status:'error',message:"user not found"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Server error"})
    }
}
export const viewCart=async(req,res)=>{
    try{
        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        );
        const userId=token._id;
        if(userId){
            const cartItems=await cart.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productData',
                    },
                },
            ]);
            const count=await cart.countDocuments({userId});
            return res.json({status:"success",cartItems:cartItems,itemCount:count})
        }else{
            return res.json({status:'error',message:"user not found"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Server error"})
    }
}

export const cartCount=async(req,res)=>{
    try{
        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        );
        const userId=token._id;
        const count=await cart.countDocuments({userId});
        return res.json({status:"success",count:count});
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Server error"})
    }
}

export const clearCart=async(req,res)=>{
    try{
        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        );
        const userId=token._id;
        if(userId){
            const clearItems=await cart.deleteMany({userId:userId})
            res.json({status:"success",message:"cleard Cart"})
        }else{
            res.json({status:"error",message:"something went wrong"});
        }
        
       
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Serve error"});
    }
}