const User=require('../models/User');
const{BadRequestError,UnauthenticatedError}=require('../errors/index');
const{StatusCodes}=require('http-status-codes');
const{createTokenUser,attachCookiesToResponse}=require('../utils/index');
const{checkPermissions}=require('../utils/index');


const getAllUser=async (req,res)=>{
    console.log(req.user);
    const users=await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser=async(req,res)=>{
    const user=await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new BadRequestError(`user not found for given id-${req.params.id}`);
    }
     checkPermissions(req.user,user._id);
    res.status(StatusCodes.OK).json({user});
}

const getCurrentUser=async (req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user});

}

const updateUser=async(req,res)=>{
    const{name,email}=req.body;
    if(!name ||!email){
        throw new BadRequestError("Please give both values")
    }
    const user=await User.findOneAndUpdate({_id:req.user.userId},{email,name},{new:true,runValidators:true});
    const payload=createTokenUser(user);
    attachCookiesToResponse(res,payload);
    res.status(StatusCodes.OK).json({updatedUser:payload});

}

const updateUserPassword=async(req,res)=>{
    const{oldPassword,newPassword}=req.body;

    if(!oldPassword||!newPassword){
        throw new BadRequestError('please give both values');
    }

    const user=await User.findOne({_id:req.user.id});

    const isPasswordCorrect=user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials');
    }
    user.password=newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:"password updated"});
}

module.exports={
    getAllUser,
    getSingleUser,
    getCurrentUser,
    updateUser,
    updateUserPassword,
};