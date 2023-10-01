const{isTokenValid}=require('../utils/index');
const{UnauthenticatedError}=require('../errors/index');
const{UnauthorizedError}=require('../errors/index');

//Authentication
const authenticate=async (req,res,next)=>{

    const token=req.signedCookies.token;
    if(!token){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try{
               const {name,userId,role}= await isTokenValid(token);
               req.user={name,userId,role};
               next();
    }
    catch(error){
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

//Authorization

const authorizePermissions=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('You are not authorized to this route');
        }
        next();
    }
    
}

module.exports={
    authenticate,
    authorizePermissions,
}