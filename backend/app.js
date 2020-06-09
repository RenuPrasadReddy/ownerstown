const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const searchRoute = require('./src/routes/searchRoute');

const app =  express();
app.use(express.json());
app.use(cors())

app.listen(process.env.PORT, ()=>  console.log('server listening to port:', process.env.PORT));
app.use('/search', searchRoute);
