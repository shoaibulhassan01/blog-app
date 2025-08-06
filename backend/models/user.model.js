import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['admin', 'author'], 
        default: 'author', 
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

export const User = mongoose.model('User', userSchema)