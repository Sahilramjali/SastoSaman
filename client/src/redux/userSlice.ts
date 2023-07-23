import { createSlice } from "@reduxjs/toolkit";
interface user{
    id:string|null;
    username:string| null;
    isLogin:boolean;


}
const initialState:user={
    id:'',
    username:"",
    isLogin:false
    
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload);
            state.id=action.payload._id;
            state.username=action.payload.username;
            state.isLogin=true;
           
        },
        logout:(state,action)=>{
            state.id='';
            state.username='';
            state.isLogin=false;
        }
    }

});
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;