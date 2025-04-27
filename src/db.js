const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!")
    } catch (err) {
        console.error("MongoDB connection failed:", err)
        process.exit(1); // Exit process if connection fails
    }
};

exports.connectDB = connectDB