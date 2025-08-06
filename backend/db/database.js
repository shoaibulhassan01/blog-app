import mongoose from 'mongoose'

const connectDB =  async () => {
    try {
        await mongoose.connect('mongodb+srv://shoaibeee25:iPfCGcnqaT4i00zB@cluster0.peqvb.mongodb.net/')
        console.log("Mongo DB Connected Successfuly 👍")
    } catch (error) {
        console.log("Error in Mongo DB Connection", error)
    }
}

export default connectDB;