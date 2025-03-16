import { json } from "express";
import { FORBIDDEN, NOT_FOUND, OK } from "../constants/http.js";
import { User } from "../modals/user.modal.js";
import appAssert from "../utils/appAssert.js";
import { Hospital } from "../modals/hospital.modal.js";
import { Appointment } from "../modals/appointment.model.js";
import { BloodRequest } from "../modals/Blood.request.modal.js";
import { BloodDonate } from "../modals/Blood.donate.model.js";
import { Lab } from "../modals/lab.model.js";

export const createUser = async (req, res) => {
 
        const { name, email } = req.body;

       
        appAssert(name || email,NOT_FOUND,"Name and email are required.");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        } 
        appAssert(!existingUser,FORBIDDEN,"Email already exists.");

        const newUser = new User({ name, email });
        await newUser.save();

        res.status(OK).json({ message: "User created successfully", user: newUser });
    
};
export const getUser=async (req, res) => {

    const {email}=req.query;
    // console.log("Received email:", req.query.email);
    appAssert(email,FORBIDDEN,'Email is required...');
    const user = await User.findOne({ email });
    // appAssert(user,NOT_FOUND,"user is not found in db..");
    res.status(OK).json({ user });
}

export const updateUser=async (req, res) => {
    
    const {
        id,
        name,
        email,
        dob,
        gender,
        phone,
        address,
        city,
        zipcode,

    }=req.body;

    console.log(req.body)

    const user =await User.findByIdAndUpdate(id,{
        name,
        email,
        DOB:dob,
        gender,
        phone,
        address,
        city,
        zipcode
    },
    {new:true})

    res.status(OK).json('suc');
}

export const getAllUser=async(req,res)=>{

    const users=await User.find();
    res.status(OK).json({users});
}

export const getAllhospital=async(req,res)=>{

    const hospitals = await Hospital.find()
            .populate("Hadmin", "name email phone")  // Populate Admin details
            .populate("doctors.did", "name email phone isDoctor");
      
    res.status(OK).json({hospitals});
}

export const createHospital=async(req,res)=>{

    const {name,address,city,phone}=req.body;
    appAssert(name && address && city && phone, FORBIDDEN, "All fields are required...");

    const hospital=await Hospital.create(req.body);
    res.status(OK).json({hospital});
}

export const updatUserToDoctor=async(req,res)=>{
    const {id}=req.body;
    appAssert(id,FORBIDDEN,"id is required to update...");
    const user=await User.findByIdAndUpdate(id,{isDoctor:true},{new:true});
    res.status(OK).json({user});
}
export const updatUserToHospitaDoctor=async(req,res)=>{
    const {id,hid}=req.body;
    appAssert(id&&hid,FORBIDDEN,"id and hid is required to update...");
    const user=await User.findByIdAndUpdate(id,{isHadmin:true,Hadmin:hid},{new:true});
    const hospital=await Hospital.findByIdAndUpdate(hid,{Hadmin:id})
    res.status(OK).json();
}

export const updatHospitalDoctors=async(req,res)=>{
   
            const { hid, docid } = req.body;
    
            // Check if both IDs are provided
            if (!hid || !docid) {
                return res.status(403).json({ message: "hid and docid are required to update" });
            }
    
            // Find hospital and push new doctor ID
            const hospital = await Hospital.findByIdAndUpdate(
                hid,
                { $push: { doctors: { did: docid } } }, // Correctly pushing doctor ID into the array
                { new: true } // Return updated document
            );
    
            if (!hospital) {
                return res.status(404).json({ message: "Hospital not found" });
            }
    
            res.status(200).json({ message: "Doctor assigned successfully", hospital });
        
    }

export const bookAppontment=async(req,res)=>{
    const {docid,patientid,date,time}=req.body;
    console.log(req.body);
    appAssert(docid&&patientid&&date&&time,FORBIDDEN,"All fields are required")
    const appointment=await Appointment.create({
        userid:patientid,
        doctorid:docid,
        date:date,
        time:time
    });

    res.status(OK).json({appointment});

    }
export const getAllAppointmet=async(req,res)=>
    {
        const {docid}=req.body;
        const appointments=await Appointment.find({doctorid:docid}).populate("userid")
        res.status(OK).json({appointments});
    }
export const reScheduleAppointmet=async(req,res)=>
        {
            const {id,date,time}=req.body;
            const appointment=await Appointment.findByIdAndUpdate(id,{date,time})
            res.status(OK).json({appointment});
        }
export const confrimAppointmet=async(req,res)=>
            {
                const {id}=req.body;
                const appointment=await Appointment.findByIdAndUpdate(id,{Status:'confrim'});
                res.status(OK).json({appointment});
            }
export const getAllAppointmetforuser=async(req,res)=>
                {
                    const {id}=req.body;
                    const appointments=await Appointment.find({userid:id}).populate("doctorid")
                    res.status(OK).json({appointments});
                }
export const createBloodRequest=async(req,res)=>
{
    const {userid,bloodgroup}=req.body;
    appAssert(
        userid&&bloodgroup,FORBIDDEN,"All fields are required"
    );
    const bloodrequest=await BloodRequest.create({
        userid:userid,
        bloodgroup:bloodgroup,

    });
    res.status(OK).json({bloodrequest});


}
export const getBloodRequest=async(req,res)=>
{
    const {userid}=req.body;
    appAssert(
        userid,FORBIDDEN,"Userid is required"
    );
    const bloodrequest=await BloodRequest.find({userid:userid}).populate("hospitalId");

    res.status(OK).json({bloodrequest});
}
export const getAllBloodRequest=async(req,res)=>{
   
    const bloodrequest=await BloodRequest.find({status:"pending"}).populate('userid');
    res.status(OK).json({bloodrequest});
}

export const updateBloodRequest=async(req,res)=>{
   
   const {id,hospitalid}=req.body;
   appAssert(
    id&&hospitalid,FORBIDDEN,"All fields are required"
   )
   const bloodrequest=await BloodRequest.findByIdAndUpdate(id,{hospitalId:hospitalid,status:"approved"});
   res.status(OK).json({bloodrequest});


}

export const creatBloodDonation=async(req,res)=>{
   
    const {userid,hospitalid,date}=req.body;
    appAssert(
        userid&&hospitalid&&date,FORBIDDEN,"All fields are required"
     
    )
    const blooddonation=await BloodDonate.create({
       userid:userid,
       hospitalId:hospitalid,
       scheduledTime:date    
    });
    res.status(OK).json({blooddonation});
   
 
 
 }
 export const getBloodDonation=async(req,res)=>{
   
    const {hospitalid}=req.body;
    appAssert(
        hospitalid,FORBIDDEN,"All fields are required"
     
    )
    const blooddonation=await BloodDonate.find({hospitalId:hospitalid}).populate("userid");
    res.status(OK).json({blooddonation});
   
 
 
 }

 export const updateBloodDonation=async(req,res)=>{
   
    const {id,data}=req.body;
    appAssert(
        id&&data,FORBIDDEN,"All fields are required"
        
     
    )
    const blooddonation=await BloodDonate.findByIdAndUpdate(id,{
        Status:data
    })
    res.status(OK).json({blooddonation});
   
 
 
 }
 export const getBloodDonationuserid=async(req,res)=>{
   
    const {userid}=req.body;
    appAssert(
        userid,FORBIDDEN,"All fields are required"
     
    )
    const blooddonation=await BloodDonate.find({userid}).populate("hospitalId");

    res.status(OK).json({blooddonation});
   
 
 
 }

 export const creatLabRecord=async(req,res)=>{
   console.log("khj")
    const {userid,hospitalId}=req.body;
    appAssert(
        userid&&hospitalId,FORBIDDEN,"All fields are required"
     
    )
    const lab=await Lab.create({
        userid,
        hospitalId
    })
    res.status(OK).json({lab});
   
 
 
 }
 export const getLabRecord=async(req,res)=>{
   
    const {userid}=req.body;
    appAssert(
        userid,FORBIDDEN,"All fields are required"
     
    )
   const lab=await Lab.find({userid}).populate('userid').populate('hospitalId');
    res.status(OK).json({lab});
   
 
 
 }

