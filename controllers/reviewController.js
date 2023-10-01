const Review=require('../models/review');
const Product=require('../models/Product');
const{StatusCodes}=require('http-status-codes');
const {BadRequestError,NotFoundError}=require('../errors/index');
const { checkPermissions } = require('../utils');
const createReview=async(req,res)=>{
    const{product:productId}=req.body;

    const isValidProduct=await Product.findOne({_id:productId});
    if(!isValidProduct){
        throw new NotFoundError(`No product with id ${productId}`);
    }
    const alreadySubmitted=await Review.findOne({product:productId,user:req.user.userId});
    if(alreadySubmitted){
        throw new BadRequestError('Aldready submitted');
    }

    req.body.user=req.user.userId;
    const review=await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({createdReview:review});

}
const getAllReviews=async(req,res)=>{
    
    const allreviews=await Review.find({})
    .populate({path:'product',select:'name price description'})
    .populate({path:'user',select:'name'});

    res.status(StatusCodes.OK).json({allreviews});

}
const getSingleReview=async(req,res)=>{
    
    const{id:reviewId}=req.params;

    const review=await Review.findOne({_id:reviewId});
    if(!review){
        throw new NotFoundError(`No review with id ${reviewId}`);
    }
    res.status(StatusCodes.OK).json({singleReview:review});

}
const updateReview=async(req,res)=>{
    
    const{id:reviewId}=req.params;
    const{rating,title,comment}=req.body;

    const review=await Review.findOne({_id:reviewId});
    if(!review){
        throw new NotFoundError(`No review with id ${reviewId}`);
    }
    checkPermissions(req.user,review.user);
    review.rating=rating;
    review.title=title;
    review.comment=comment;
    await review.save();

    res.status(StatusCodes.OK).json({updatedReview:review});

}

const deleteReview=async(req,res)=>{
    
    const{id:reviewId}=req.params;

    const review=await Review.findOne({_id:reviewId});
    if(!review){
        throw new NotFoundError(`No review with id ${reviewId}`);
    }
    checkPermissions(req.user,review.user);
    await review.remove();
    res.status(StatusCodes.OK).json({deletedReview:review});

}

const getProductReviews=async(req,res)=>{

    const{id:productId}=req.params;

    const reviews=await Review.find({product:productId});
    if(!reviews){
        throw new NotFoundError("No reviews for given product id");
    }
    res.status(StatusCodes.OK).json({reviews});
}


module.exports={
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getProductReviews,
};