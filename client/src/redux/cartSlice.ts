import { createSlice } from "@reduxjs/toolkit";

export interface cardItem{
    _id:string,
    userId:string,
    productId:string,
    quantity:number,
    productData:[
      {
        _id:string;
        name:string;
        category:string;
        description:string;
        imageUrl:string;
        price:number;
        userId:string;
        createdAt:string;
        updatedAt:string
      }
    ]
  }

  interface initialState{
    cartItems:cardItem[];
    itemCount:number;
    totalPrice:number;
  }

  const initialState:initialState={
    cartItems:[],
    itemCount:0,
    totalPrice:0,
  }

  export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
           
            state.cartItems=[...new Set([...action.payload])];
            state.itemCount=state.cartItems.length;
            
            state.totalPrice=state.cartItems.reduce((acc,curr)=>{
                return acc+(curr.quantity*curr.productData[0].price);
            },0);
        },
        clearCart:(state)=>{
            state.cartItems=[];
            state.itemCount=state.cartItems.length;
        },
       
    }
  });

  export const{addToCart,clearCart}=cartSlice.actions;
  export default cartSlice.reducer;