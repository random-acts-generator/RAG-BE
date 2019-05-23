//import all dependencies 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

//import routes
const authRoute = require('./auth/authRoute')
const userRoute = require('./routes/userRoute')
const raRoute = require('./routes/raRoute')
const contactRoute = require('./routes/contactRoute')

//define server
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

//middleware
const requestOptions = {
  headers: { accept: 'application/json' },
};

//load routes
server.use('/api/auth', authRoute);
server.use('/api/users',  userRoute);
server.use('/api/contacts',  contactRoute);
server.use('/api/acts',  raRoute);

//check if running properly
server.get('/', (req, res) => {
  res.send('We are open for business!')
})

//export
module.exports = server;