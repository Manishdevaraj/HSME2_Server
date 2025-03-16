import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorid:
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
    },
   time:{
    type:String
   },
   date:{
    type:String
    },
   userid:
   {
     type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
   },
  
   Status:{
    type:String,
    default:'pending'
   },

     
},{
  timestamps:true
});

export const Appointment = mongoose.model('appointment', AppointmentSchema);

