import { Router } from "express";
import { catchError } from "../utils/catchError.js";
import { bookAppontment, confrimAppointmet, creatBloodDonation, createBloodRequest, createHospital, createUser, creatLabRecord, getAllAppointmet, getAllAppointmetforuser, getAllBloodRequest, getAllhospital, getAllUser, getBloodDonation, getBloodDonationuserid, getBloodRequest, getLabRecord, getUser, reScheduleAppointmet, updateBloodDonation, updateBloodRequest, updateUser, updatHospitalDoctors, updatUserToDoctor, updatUserToHospitaDoctor } from "../controllers/user.controller.js";

export const userRoute=Router();

userRoute.post('/register',catchError(createUser));
userRoute.get('/get',catchError(getUser));
userRoute.post('/update',catchError(updateUser));
userRoute.get('/all',catchError(getAllUser));
userRoute.get('/get/all/hospital',catchError(getAllhospital));
userRoute.post('/create/hospital',catchError(createHospital));
userRoute.post('/role/doctor',catchError(updatUserToDoctor));
userRoute.post('/role/hadmin',catchError(updatUserToHospitaDoctor));
userRoute.post('/update/hospital/doctors',catchError(updatHospitalDoctors));
userRoute.post('/book/appointment',catchError(bookAppontment));
userRoute.post('/all/appointment',catchError(getAllAppointmet));
userRoute.post('/reschedule/appointment',catchError(reScheduleAppointmet));
userRoute.post('/confrim/appointment',catchError(confrimAppointmet));
userRoute.post('/get/doctor/appointment',catchError(getAllAppointmetforuser));
userRoute.post('/creat/bloodrequest',catchError(createBloodRequest));
userRoute.post('/get/bloodrequest',catchError(getBloodRequest));
userRoute.get('/getall/bloodrequest',catchError(getAllBloodRequest));
userRoute.post('/update/bloodrequest',catchError(updateBloodRequest));
userRoute.post('/create/blooddonation',catchError(creatBloodDonation));
userRoute.post('/get/blooddonation',catchError(getBloodDonation));
userRoute.post('/update/blooddonation',catchError(updateBloodDonation));
userRoute.post('/get/userid/blooddonation',catchError(getBloodDonationuserid));
userRoute.post('/get/labrecord',catchError(getLabRecord));
userRoute.post('/create/labrecord',catchError(creatLabRecord));





















