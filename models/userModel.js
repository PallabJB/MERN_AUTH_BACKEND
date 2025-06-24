import mongoose  from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minLength:[8, 'Password must have at least 8 characters.'],
        maxLength:[32, 'Password cannot have more than 32 characters.'],
        select:false, // This will not return the password when fetching user data
    },
    phone:{
        type:String,
    },
    accountVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:Number,
    },
    verificationCodeExpire:{
        type:Date,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function(){
    function generateRandomFiveDigitNumber(){
        const firsttDigit = Math.floor(Math.random() * 9) + 1;
        const remainingDigits = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, 0); 
        return parseInt(firsttDigit + remainingDigits);
    }
    const verificationCode = generateRandomFiveDigitNumber();
    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now() + 5 * 60 * 1000;

    return verificationCode;
};

userSchema.methods.generateToken =  function(){
    return  jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,
       { expiresIn: process.env.JWT_EXPIRE}
    );  
    
};

userSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes   
    return resetToken; 
}

export const User = mongoose.model('User', userSchema);