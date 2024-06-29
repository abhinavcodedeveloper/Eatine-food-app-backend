import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        require:true
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    country:{
        type:String
    },
    Pincode:{
        type:Number
    }

});

const User  = mongoose.model("User",userSchema);
export default User;