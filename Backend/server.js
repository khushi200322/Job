// packaagess Import
import express from "express";
import dotenv from "dotenv";
import color from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
//files importss
import connectDB from "./config/db.js";
//routes importt

import testRoutes from  './routes/testroutes.js';
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middlewares/errorMiddleware.js";

//Dot env config
dotenv.config()

//mongodb connection
connectDB();


//rest object
const app = express()

//middlewares
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))


//routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);

//validation middleware 
app.use(errorMiddleware)



//port
const PORT = process.env.PORT || 8080


//listen
app.listen(PORT,()=>{
    console.log(`Node server Running In ${process.env.DEV_MODE} mode on port number ${PORT}`.bgCyan.white);

})