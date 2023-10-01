const User=require('../models/User');
const{BadRequestError}=require('../errors/index');
const {StatusCodes}=require('http-status-codes');
const{attachCookiesToResponse,createTokenUser}=require('../utils/index');

//registering user

const register=async (req,res)=>{
    const{name,email,password}=req.body;

    const emailAlreadyExists=await User.findOne({email});
    if(emailAlreadyExists){
          throw new BadRequestError('Email Already Exists');
    }

    const isFirstAccount=(await User.countDocuments({})) === 0;
    const role=isFirstAccount?'admin':'user';
    
    const user=await User.create({name,email,password,role});
    
    const payload=createTokenUser(user);
    attachCookiesToResponse(res,payload);
    
    res.status(StatusCodes.CREATED).json({user:payload});

    

}

//logging in user
const login=async (req,res)=>{

    const{email,password}=req.body;
    if(!email||!password){
        throw new BadRequestError('please provide emial/password');
    }
    const user=await User.findOne({email});
    if(!user){
        throw new BadRequestError('Invalid credentials');
    }
    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new BadRequestError('Invalid credentials');
    }

    const payload=createTokenUser(user);
    attachCookiesToResponse(res,payload);
    res.status(StatusCodes.OK).json({user:payload});
}

//loggingout user
const logout=async (req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()+1000),
    })
    res.status(StatusCodes.OK).json({msg:'User Has Been Logged Out'});
}

module.exports={
    register,
    login,
    logout,
};