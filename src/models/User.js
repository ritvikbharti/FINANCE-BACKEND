import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        emain:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required: true
        },
        role:{
            type:String,
            enum: ["viewer", "analyst", "admin"],
            default: "viewer"
        }
    },
    {timestamps:true}
);


export default mongoose.model("User", userSchema);



