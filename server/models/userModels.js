// to store the data in a mongodb database we have to create the model.
import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
    name:{type: String, require: true},
    email:{type: String, require: true, unique: true},
    password:{type: String, require: true},
    verifyOtp:{type: String, default: ''},
    verifyOtpExpireAt:{type: Number, default: 0},
    isAccountVerified:{type: Boolean, default: false},
    resetOtp:{type: String, default: ''},
    resetOtpExpireAt:{type: Number, default: 0}
})

//now add user model
const userModel = mongoose.model.user || mongoose.model('user', userSchema)

export default userModel;