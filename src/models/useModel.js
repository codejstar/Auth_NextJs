import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide a email"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
     isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: {type: Date},
    verifyToken: String,
    verifyToeknExpiry: {type: Date}

})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;