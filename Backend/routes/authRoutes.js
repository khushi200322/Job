import express from "express";
import { login, register } from "../controller/userController.js";


//router object
const router = express.Router()

//routes
//Register route || post method
router.post('/register',register)

//LOGIN || POST METHOD
router.post('/login',login)

    //export router
    export default router;
