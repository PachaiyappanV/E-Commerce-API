const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide Name'],
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'Please Provide E-mail'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'Please Provide Valid E-mail'
        }


    },
    password:{
        type:String,
        required:true,
        minlength:8,

    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},)


UserSchema.pre('save',async function(){

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;

})

UserSchema.methods.comparePassword=async function(candidatePassword){
    const isCorrect=await bcrypt.compare(candidatePassword,this.password);
    return isCorrect;
}

module.exports=mongoose.model('User',UserSchema);