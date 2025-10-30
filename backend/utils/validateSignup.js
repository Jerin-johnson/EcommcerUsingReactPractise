import validator from "validator"
import User from "../models/userModel.js";

async function isValidSingUp(req){
const{username,email,password} = req.body;

    

    if(!username ||!email || !password )
    {
        throw new Error("All fields are required");
    }

    if(!validator.isEmail(email))
    {
        throw new Error("Email must be valid");
    }
    const user = await User.findOne({email});

    if(user)
    {
        throw new Error("User already exist");
    }
    return true;
}

export default isValidSingUp;