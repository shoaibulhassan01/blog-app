import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        unique: true
    },
    description:{
        type:String,
        require: true
    },
    author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
          required: true,
        },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export const Category = mongoose.model('Category', categorySchema)