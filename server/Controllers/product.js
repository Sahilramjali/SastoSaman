
import {v4 as uuidV4} from 'uuid';
import Product from '../Models/Product.js';
import jwt from 'jsonwebtoken';
import uploadImage from '../Utils/uploadImage.js'

export const addProduct=async(req,res)=>{
    try{
      
        const token=jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET_KEY
        );
        
        const userId=token._id;
        const{name,category,description,price,image}=req.body;
        const imageId=  uuidV4().split('-')[0];
     
        if(userId){
            const imageUrl=await uploadImage(image,imageId);
            const product=new Product({
                name,
                category,
                description,
                price,
                imageUrl,
                userId,
            });
            const result=await product.save();
            return res.json({status:"success",message:"Product is added successfully"});
        }else{
            return res.json({status:"error",message:"User is not verified"});

        }
        
    }catch(err){
        
        console.log("error in add product controller :");
        console.log(err);
        res.status(500).json({status:"error",message:"Internal server error"})
    }
}

export const getProductByCategory=async(req,res)=>{
    try{
     const {category}=req.query;
     
     const query=Product.find({category:category}).sort({createdAt:-1});
     const products=await query.exec();
     
     res.json({status:"success",products:products});
    }catch(err){
        console.log("error in get product by category controller :");
        console.log(err);
        res.status(500).json({status:"error",message:"Internal server error"})
    }
}
export const getSingleProdutDetails=async(req,res)=>{
    try{
        const id=req.params.id;
        const product=await Product.find({_id:id});
        // const product=await query.exec();
        res.json({status:'success',product:product});

    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",message:"Internal Server error"});
    }
}