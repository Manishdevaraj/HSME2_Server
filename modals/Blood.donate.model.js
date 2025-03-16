import mongoose from "mongoose";

const BloodDonateSchema = new mongoose.Schema({
   userid:
   {
     type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
   },
   hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hospital'
   },
   scheduledTime:{
    type:String
   },
   Status:{
    type:String,
    default:"pending"
   }
     
},{
   timestamps:true
 });

export const BloodDonate = mongoose.model('blooddonate', BloodDonateSchema);

