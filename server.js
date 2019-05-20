//import all dependencies 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

//import routes
const authRoute = require('./auth/authRoute')

//define server
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

//load routes
server.use('/api/auth', authRoute);

//check if running properly
server.get('/', (req, res) => {
  res.send('We are open for business!')
})

//export
module.exports = server;