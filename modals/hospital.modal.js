import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
    name: String,
    doctors:[{
        did:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    address: String,
    city: String,
    Hadmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    phone:{
        type: String,
    }

    
   
     
},{
    timestamps:true
  });

export const Hospital = mongoose.model('hospital', HospitalSchema);

