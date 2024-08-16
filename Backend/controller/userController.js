import usermodel from "../model/usermodel.js";


//SIGNUP
export const register = async (req, res,next) => {
  
    const { name, email, password } = req.body;
    //validate
    if (!name) {
     next("Name is required...");
    }
    if (!email) {
      next("Email is required...");
      
    }
    if (!password) {
      next("Password is required and gretaer than 6 cahracter...");
    
    }
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      next("Email already register Please login")
    }

    const user = await usermodel.create({ name, email, password });

    //token
    const token = user.createJWT()
    res
      .status(201)
      .send({ success: true, message: "User created Successfully" ,user:{
        name : user.name,
        lastName :user.lastName,
        email: user.email,
        location:user.location

      },
      token});
   
};



//SIGNIN

export const login = async(req,res,next)=>{
  const {email,password} = req.body
  //validation

  if(!email || !password){
    next('PLease provide All fields')
  }

  //Find user by email
  const user = await usermodel.findOne({email})
  if(!user){
    next('Invalid Username and Password')
  }

  //compare password
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    next('Invalid Username and Password')
  }

  const token = user.createJWT()
  res.status(200).json({success:true,message:"User login Successfully",user,token,});
};



