import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signin = async (req,res)=>{
    try{
        const {email , password} = req.body;
        const existingUser = await User.findOne({email}).exec();
        //console.log(existingUser);
        if(!existingUser) return res.status(404).json({message: "User doesn't exist. Sign Up!"});
        
        // const existingUser= existingUsers[0];
        bcrypt.compare(password,existingUser.password,(err,result)=>{
            
            if(err) return res.status(401).json({message: "Invalid Credentials. Please Try again."});
            if(result) {
                const token = jwt.sign({email,id: existingUser._id},"practice",{expiresIn: "1h"});
                return res.status(200).json({result: existingUser, token});                
            }
            else {
                return res.status(401).json({message: "Invalid Credentials. Please try again."});
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Something went wrong. Try again Later."});
        
    }
} 

export const signup = async (req, res)=>{
    try{
        const {email , password, firstName, lastName} = req.body;
        const existingUser = await User.find({email}).exec();
        existingUser.length?console.log("true"):console.log("false");
        console.log(existingUser.length);
        if(existingUser.length) return res.status(404).json({message: "User already exists. Sign in!"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email,password: hashedPassword,name: `${firstName} ${lastName}` });

        const token = jwt.sign({email,id: result._id},"practice",{expiresIn: "1h"});

        return res.status(201).json({result,token});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Something went wrong. Try again later."});
        
    }
}