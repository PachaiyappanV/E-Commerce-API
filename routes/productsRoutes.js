const express=require('express');
const router=express.Router();
const{authenticate,authorizePermissions}=require('../middleware/authentication');

const{getProductReviews}=require('../controllers/reviewController');
const{
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage,  }=require('../controllers/productsController');

router.route('/')
.post([authenticate,authorizePermissions('admin')],createProduct)
.get(getAllProducts);

router.route('/uploadImage').post([authenticate,authorizePermissions('admin')],uploadImage);

router.route('/:id')
.get(getSingleProduct)
.patch([authenticate,authorizePermissions('admin')],updateProduct)
.delete([authenticate,authorizePermissions('admin')],deleteProduct);

router.route('/:id/reviews').get(getProductReviews);

module.exports=router;