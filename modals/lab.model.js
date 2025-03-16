import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  
 userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
 },
 hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"hospital"
 }     
},{
    timestamps:true
  });

export const Lab = mongoose.model('lab', labSchema);

