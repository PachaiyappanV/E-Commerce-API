const express=require('express');
const router=express.Router();
const{authenticate}=require('../middleware/authentication');


const{
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview }=require('../controllers/reviewController');

router.route('/').post(authenticate,createReview).get(getAllReviews);

router.route('/:id')
.get(getSingleReview)
.patch(authenticate,updateReview)
.delete(authenticate,deleteReview);    

module.exports=router;