const app = require('./app');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

 

// Load config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: '.env' });
}

// Check if DB_URI is set
if (!process.env.DB_URI) {
    console.error('Error: DB_URI is not defined in the environment variables');
    process.exit(1);
}

// Connect to Database
mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected to ${data.connection.host}`);
    })
    

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});
