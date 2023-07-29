import {Schema,model} from 'mongoose';
const productCategories=[
    'Clothes',
    'Consumables',
    'Home appliance',
    'Electronics appliance',
    'Beauty and care',
    
]
 const productSchema=new Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        maxlength:30
    },
    category:{
        type:String,
        required:[true,"Product category is required"],
        enum:productCategories,
    },
    description:{
        type:String,
        required:[true,"Proudct Description is required"],
        maxlength:1000000000000
    },
    imageUrl:{
        type:String,
        required:[true,'image is requried']
    },
    price:{
        type:Number,
        requried:[true,'proudct price is required'],
        min:0
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        requried:[true,"user Id is required"],
    }

},{
    timestamps:true
}
);
const Product=model('product',productSchema);
export default Product;
