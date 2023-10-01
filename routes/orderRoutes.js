const express=require('express');
const router=express.Router();
const{authenticate,authorizePermissions}=require('../middleware/authentication');
const{
    getAllOrders,
    getCurrentUserOrders,
    getSingleOrder,
    createOrder,
    updateOrder, }=require('../controllers/orderController');

router.route('/').post(authenticate,createOrder).get(authenticate,authorizePermissions('admin'),getAllOrders);

router.route('/showAllMyOrders').get(authenticate,getCurrentUserOrders);

router.route('/:id')
.get(authenticate,getSingleOrder)
.patch(authenticate,updateOrder);

module.exports=router;
