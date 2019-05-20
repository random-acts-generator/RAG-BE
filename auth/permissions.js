//dotenv
require('dotenv').config();
//set up the jwt and define the secret
const jwt = require('jsonwebtoken');
const key = process.env.SECRET

