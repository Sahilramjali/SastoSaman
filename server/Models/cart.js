import {Schema,model} from 'mongoose';

const cartModel=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:[true,"userId is required"],

    },
    productId:{
        type:Schema.Types.ObjectId,
        required:[true,"product id is requied"],
    },
    quantity:{
        type:Number,
        required:[true,"quantity is requried"]
    }
});
const cart=model('cart',cartModel);

export default cart;
