const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app  = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
});

const authRoutes = require('./Routes/authRoutes')


app.use('/api/auth',authRoutes);



module.exports = app;


