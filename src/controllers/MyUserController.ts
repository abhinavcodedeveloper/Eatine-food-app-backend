import {Request,Response} from "express"
import User from "../models/user";

// creating the user 
const CreateUser = async (req:Request,res:Response)=>{
    // check if user exists or not
    //if no then create a user 
    // return the user object 
    try{
        // take the auth id
        const {auth0Id} = req.body;
        const isexistuser = await User.findOne({auth0Id});
        if(isexistuser){
            // we have the user
            return res.status(200).send({message:"User is already present"});
        }
        
        const user = new User(req.body);
        await user.save(); 
//201->created
        res.status(201).json(user.toObject())

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"User cant get created"})
    }
     
}

export default {
    CreateUser
}