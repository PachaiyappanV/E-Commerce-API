const express=require('express');
const router=express.Router();
const {authenticate,authorizePermissions}=require('../middleware/authentication');


const{
    getAllUser,
    getSingleUser,
    getCurrentUser,
    updateUser,
    updateUserPassword }=require('../controllers/userController');

router.route('/').get(authenticate,authorizePermissions('admin','lord'),getAllUser);
router.route('/showMe').get(authenticate,getCurrentUser);
router.route('/:id').get(authenticate,getSingleUser);
router.route('/updateUser').patch(authenticate,updateUser);
router.route('/updateUserPassword').patch(authenticate,updateUserPassword);

module.exports=router;