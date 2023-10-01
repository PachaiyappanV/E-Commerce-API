const jwt=require('jsonwebtoken');
const createJWT=(payload)=>{
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
    return token;
}
//cheaking the token valid

const isTokenValid=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);

}

//attaching the cookie to the response
const attachCookiesToResponse=(res,payload)=>{
    const token=createJWT(payload);

    //cookie lifetime
    const oneDay=1000*60*60*24;
    
    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
        secure:true,
        signed:process.env.NODE_ENV==='production',
    })
}



module.exports={
    attachCookiesToResponse,
    isTokenValid,
}