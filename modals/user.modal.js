import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

     name:{
        type:String,
     },
     DOB:{
        type:String
     },
     gender:{
        type:String
     },
     phone:{
        type:String
     },
     email:{
        type:String,
        unique:true
        },
     address:{
        type:String
     }   ,
     city:{
        type:String
     },
     zipcode:{
        type:String
     },
     isDoctor:{
        type:Boolean,
        default:false
     },
     isadmin:{
        type:Boolean,
        default:false
     },
     isHadmin:{
        type:Boolean,
        default:false
     },
     Hadmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
     }

   
     
},{
   timestamps:true
 });

export const User = mongoose.model('user', userSchema);

