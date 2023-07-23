
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Register = () => {
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const navigate=useNavigate();
    const onSubmitLogin = async(formdata) => {
    
      
      try{
  const result= await axios.post('http://localhost:5000/api/auth/signup',formdata)
      if(result?.data?.status==='error'){
       return toast.error(result?.data?.message);
      }
      navigate('/login');
      return  toast.success(result.data.message);
      
      }catch(err){
        toast.error("Internal server error");
      }
    };
    return (
      <section className="flex  justify-center items-center relative">
         <div className="absolute top-36 pt-2 flex flex-col justify-center items-center pb-10 bg-cardSecondary rounded-md w-90 sm:w-96 shadow-lg p-10 mb-5">
        <h2 className="text-[2rem] pb-9">Register</h2>
        <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col justify-center items-center gap-4">
        <div>
            <Input
              variant="underLine"
              placeholder="username"
              register={register("username")}
            />
          </div>
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
          <button type="submit">Sign up</button>
        </form>
      </div>
      </section>
     
    );
  
}

export default Register