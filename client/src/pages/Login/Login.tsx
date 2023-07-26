import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { login } from "../../redux/userSlice";
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
// interface result{
//   _id:string;
//   username:string;
//   email:string;
// }
// interface response{
//   status:string;
//   message:string;
//   result?:result;
//   token?:string;
// }

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate=useNavigate();
const dispatch=useAppDispatch();
const {isLogin}=useAppSelector(state=>state.user);
const[cookies,setCookie]=useCookies(['user']);
  const onSubmitLogin = async(formdata) => {
  
    
    try{
const result= await axios.post('http://localhost:5000/api/auth/login',formdata)
    if(result?.data?.status==='error'){
     return toast.error(result?.data?.message);
    }
    dispatch(login(result.data.result))
    setCookie('user',{
      token:result.data.token,
      email:result.data.result.email,
      username:result.data.result.username,
      id:result.data.result._id,

    },
    { maxAge: 24*60*60 }
    );
    console.log("cookies : ",cookies);
    navigate('/');
    console.log(result.data.result);
  
    return  toast.success(result.data.message);
    
    }catch(err){
      console.log(err);
    }
  };
  if(isLogin){
    return <Navigate to='/'/>
  }

  return (
    <section className="flex justify-center items-center relative ">
       <div className="absolute top-36 pt-2 flex flex-col justify-center items-center pb-10 bg-cardSecondary rounded-md w-90 sm:w-96 shadow-lg p-10 mb-5">
      <h2 className="text-[2rem]">Login</h2>
      <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col justify-center items-center gap-4">
        <div>
          <Input
            variant="underLine"
            placeholder="Email"
            register={register("email")}
          />
        </div>
        <div>
          <Input
            variant="underLine"
            type="password"
            placeholder="Password"
            register={register("password")}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <span className="text-green-700"><Link to='/register'>Register</Link></span>
      </p>
    </div>
    </section>
   
  );
};

export default Login;
