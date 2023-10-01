const mongoose=require('mongoose');

const ReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:[true,"Please provide rating"],

    },
    title:{
        type:String,
        required:[true,'Please provide title of the review'],
        maxlength:100,
    },
    comment:{
        type:String,
        required:[true,'Please provide review text'],
        maxlength:500,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:[true,'Please provide product']
    }
},{timestamps:true});

ReviewSchema.index({user:1,product:1},{unique:true}); //by using this index function we can set to the review model that only one time user can write the review and a product can only have one review

//calculating the number of reviews and average rating of a product by using post hooks and statis methodes


ReviewSchema.statics.calculateNumberOfReviewsAndAveragerating=async function(productId){

    const result=await this.aggregate([
        {$match:{product:productId}},
        {$group:{
            _id:null,
            averageRating:{$avg:'$rating'},
            numOfReviews:{$sum:1},
        }}
    ])

    try{
        await this.model('Product').findOneAndUpdate({_id:productId},{
            averageRating:Math.ceil(result[0]?.averageRating||0),
            numOfReviews:result[0]?.numOfReviews||0,
        })
    }
    catch(error){
        console.log(error);
    }

}





ReviewSchema.post('save',async function(){
     await this.constructor.calculateNumberOfReviewsAndAveragerating(this.product);
})
ReviewSchema.post('remove',async function(){
    await this.constructor.calculateNumberOfReviewsAndAveragerating(this.product);
})
module.exports=mongoose.model('Review',ReviewSchema);