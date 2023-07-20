import bcrypt from 'bcrypt';
const saltRound=12;
const hashPasswod=async(password)=>{
    try{
        const hash=await bcrypt.hash(password,saltRound);
        return hash;
    }catch(err){
        throw new Error("Encryption Failed");
    }
}

export {hashPasswod}