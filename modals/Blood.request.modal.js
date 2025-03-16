import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema({
   userid:
   {
     type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
   },
   bloodgroup:
   {
    type: String,
   },
   status:{
    type:String,
    default:'pending'
   },
   hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hospital'
   }

    
   
     
},{
   timestamps:true
 });

export const BloodRequest = mongoose.model('bloodrequest', BloodRequestSchema);

