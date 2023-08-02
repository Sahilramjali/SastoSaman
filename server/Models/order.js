import {Schema,model} from 'mongoose';

const orderModel=new Schema({
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
const order=model('order',orderModel);

export default order;