import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from "../utils/config";
import User from "../db/schema/User"; 

const test = (req:Request, res:Response) =>{res.status(200).send({
    message:"Welcome to Auth Route",
    status:200,
    data:"ok"
})};

const signup = async (req:Request, res:Response) =>{
    try {
        const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).send({ 
        status: false,
        message: 'User already exists'
     });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };
    
    // Generate JWT token
    let token = jwt.sign(payload,config.secretKey as string,{expiresIn:3600})
        res.status(200).send({
            message:"SignUp Successfully",
            status:true,
            data:token
        })
    } catch (error:any) {
        console.log("Error", error);
        res.status(400).send({
            message:error.message,
            status:false
        }) 
    }
    };

    // Sign in
    const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      let user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ 
            status: false,
            message: 'User Not Exists ' 
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ 
            status: false,
            message: 'Invalid Credentials' 
        });
      }
  
      const payload = {
        user: {
          id: user._id,
        },
      };
  
      // Generate JWT token
    let token = jwt.sign(payload,config.secretKey as string,{expiresIn:3600})
    res.status(200).send({
        message:"Login Successfully",
        status:true,
        data:token
    })
} catch (error:any) {
    console.log("Error", error);
    res.status(400).send({
        message:error.message,
        status:false
    }) 
}
  };


export { test, signup, login };