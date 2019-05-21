//dotenv
require('dotenv').config();
//set up the jwt and define the secret
const jwt = require('jsonwebtoken');
const key = process.env.SECRET

module.exports = {
  permissions
}

//the authentication function 
function permissions(req, res, next) {
  //grab permission from the headers
  const token = req.get('Permission');

  if(token) {
    jwt.verify(token, ket, (err, decode) => {
      if(err) return res.status(401).json(err);

      req.decode = decode;

      next();
    })
  }
  else {
    return res.status(401).json({
      message: 'Please provide a token/key for permission to enter this area.'
    })
  }
}