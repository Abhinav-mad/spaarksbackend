const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app  = express();
app.use(express.json())


// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, {
});



// Import and use authentication routes

const authRoutes = require('./Routes/authRoutes')

app.use('/api/auth',authRoutes);


// Import and use restaurant-related routes

const restaurentRoutes = require('./Routes/restaurentRoutes')

app.use('/api/restaurent',restaurentRoutes);



module.exports = app;


