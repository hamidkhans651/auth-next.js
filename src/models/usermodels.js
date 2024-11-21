import { verify } from "crypto";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: [true, "Please provide an username"],
        unique: true
    },
    email: {
        type: string,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: string,
        required: [true, "Please provide an password"],
    },
    isVerified: {
        type: boolean,
        default: false
    },
    isAdmin: {
        type: boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const User = mongoose.models.users || mongoose.model("users","userSchema")

export default User