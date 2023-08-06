
import Product from "../Models/Product.js";

export const search=async(req,res)=>{
    try{
     const {searchValue}=req.params;
     const results=await Product.find({
        $or:[
            { name: { $regex: searchValue, $options: 'i' } },
            { description: { $regex: searchValue, $options: 'i' } },
        ]
     }).exec();
     res.json(results);
    }catch(err){
        console.log("error in  search controller :");
        console.log(err);
        res.status(500).json({status:"error",message:"Internal server error"})
    }
}