import mongoose from "mongoose";



const recordSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    notes:{
        type:String,
        default: ""

    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

},
{timestamps: true}
);

export default mongoose.model("Record", recordSchema);



