const mongoose = require('mongoose');

const connectDB = async (onSuccess) => {
   
    await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected successfully!")
        onSuccess()
    })
    .catch (err => {
        console.error("MongoDB connection failed:", err)
        process.exit(1)
    })
    
}

exports.connectDB = connectDB