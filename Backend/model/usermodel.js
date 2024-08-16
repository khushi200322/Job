import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT  from 'jsonwebtoken';

//schema
const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,'Name is require']
    },
    lastName:{
        type:String,
        // required:[true,'Lastname is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail,                                    

    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length should be grater than 6 charachter'],
        // select:true
    },
    location:{
        type:String,
        default:"India"
    },



},
{timestamps:true});

//middlewares
 userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt);

 })

 //compare passwords
 userSchema.methods.comparePassword = async  function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch;

 }

 //JSON Webtoken
 userSchema.methods.createJWT = function(){
    return JWT.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
 }

export default mongoose.model('User',userSchema)