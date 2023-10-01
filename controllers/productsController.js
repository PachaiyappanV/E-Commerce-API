const Product=require('../models/Product');
const{StatusCodes}=require('http-status-codes');
const{NotFoundError,BadRequestError}=require('../errors/index');
const path=require('path');
const createProduct=async(req,res)=>{
    req.body.user=req.user.userId;

    const product=await Product.create(req.body);
    res.status(StatusCodes.OK).json({product});
}

const getAllProducts=async(req,res)=>{
    const products=await Product.find({});

    res.status(StatusCodes.OK).json({products,count:products.length});
}

const getSingleProduct=async(req,res)=>{
    
    const product=await Product.findOne({_id:req.params.id}).populate('reviews');

    if(!product){
         throw new NotFoundError('Could not get product');
    }
    res.status(StatusCodes.OK).json({product});
}

const updateProduct=async(req,res)=>{
    
    const product=await Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true});

    res.status(StatusCodes.OK).json({updatedProduct:product});
}

const deleteProduct=async(req,res)=>{
    
    const product=await Product.findOne({_id:req.params.id});

    await product.remove();
    res.status(StatusCodes.OK).json({DeletedProduct:product});
}

const uploadImage=async(req,res)=>{
    
    if(!req.files){
            throw new BadRequestError('No files received');
    }
    const productImage=req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('Please provide image');
    }

    const imagePath=path.join(__dirname,'../public/uploads/'+`${productImage.name}`);
    await productImage.mv(imagePath);

    res.status(StatusCodes.OK).json({imageName:productImage.name});
}

module.exports={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};