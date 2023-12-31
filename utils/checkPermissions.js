const{UnauthorizedError}=require('../errors/index.js')

const checkPermissions=(requestUser,resourceUserId)=>{
    
    if(requestUser.role==='admin') return;

    if(requestUser.userId===resourceUserId.toString()) return;

    throw new UnauthorizedError('Not Authorized To Access');

}

module.exports=checkPermissions;