// import { createSlice } from "@reduxjs/toolkit";

// interface cardItem{
//     _id:string,
//     userId:string,
//     productId:string,
//     quantity:number,
//     productData:[
//       {
//         _id:string;
//         name:string;
//         category:string;
//         description:string;
//         imageUrl:string;
//         price:number;
//         userId:string;
//         createdAt:string;
//         updatedAt:string
//       }
//     ]
//   }

//   interface initialState{
//     cartItems:cardItem[];
//     itemCount:number;
//   }

//   const initialState:initialState={
//     cartItems:[],
//     itemCount:0,
//   }

//   export const cartSlice=createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//         addToCart:(state,action)=>{
//             state.cartItems=[...state.cartItems,action.payload.cartItem];
//             state.itemCount=state.cartItems.length;
//         },
//         clearCart:(state)=>{
//             state.cartItems=[];
//             state.itemCount=state.cartItems.length;
//         },
//         increase: (state, { payload }) => {
//             const cartItem = state.cartItems.find((item) => item._id === payload._id);
//             cartItem?.quantity = cartItem?.quantity + 1;
//           },
//           decrease: (state, { payload }) => {
//             const cartItem = state.cartItems.find((item) => item.id === payload.id);
//             cartItem.amount = cartItem.amount - 1;
//           },
//     }
//   })