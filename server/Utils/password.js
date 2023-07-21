import bcrypt from 'bcrypt';
const saltRound=12;
const encryptPassword=async(password)=>{
    try{
        const hash=await bcrypt.hash(password,saltRound);
        return hash;
    }catch(err){
        throw new Error("Encryption Failed");
    }
}

const verifyPassword=async(password,hashedPassword)=>{
    try{
        const isMatch=await bcrypt.compare(password,hashedPassword);
        return isMatch;
    }catch(errr){
        throw new Error("Password doesn't match");
    }
}

export {encryptPassword,verifyPassword}