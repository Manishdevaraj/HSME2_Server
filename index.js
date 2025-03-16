import express from "express";
import "dotenv/config";
import cors from 'cors';
import { errorHandeler } from "./middleware/errorHandeler.js";
import { connectToDb } from "./config/db.js";
import { PORT } from "./constants/env.js";
import { userRoute } from "./routes/user.route.js";


const app=express();
app.use(express.json());
app.use(cors({
  origin:'*',
  credentials:true
}))

app.get('/',(req,res)=>
    {
        res.send("The Secure server running good...");
    })


app.use('/user',userRoute);

app.use(errorHandeler);    

app.listen(PORT,'0.0.0.0',async()=>{
        console.log(`ResultWiz server running at http://localhost:${PORT}`);
        await connectToDb();
      })