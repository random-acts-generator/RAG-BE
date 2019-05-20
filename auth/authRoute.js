//import the dependencies
const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import the model, router, and function
const Users = require('../data/models/userModel');
const { permissions } = require('./permissions');
const router = express.Router();

//error messages 
const missingError = res => {
  res.status(404).json({ error: 'This user does not exist'});
};

const newError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

//creating a token
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.first
  }
  const secret = process.env.JWT_SECRET
  const options = { 
    expiresIn: '20h'
  }

  return jwt.sign(payload, secret, options)
}



//CRUD requests
//register 
router.post('/register', ( req, res ) => {
  // implement user registration
  const { username, password } = req.body
  const user = { username, password }
  
  const hash = bcrypt.hashSync(user.password, 8) 
  user.password = hash

  Users
  .insert(user)
  .then( newUser => {
    res.status(201).json(newUser)
  })
  .catch( err => {
    return res.status(500).json( err )
  })
})

//login
router.post('/login', (req, res) => {
  // implement user login
  const { username, password } = req.body

  Users
  .getByUser( username )
  .then( user => {
    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `Welcome ${user.username}`, 
        token
      })
    }
    else {
      return res.status(401).json({ message: 'try again' })
    }
  })
  .catch( err => {
    return res.status(500).json( err );
  })
})

//logout
router.get('/logout', (req, res) => {
  if(req.session) { 
    req.session.destroy( err => {
      if(err) { 
        res.send('i mean did you think i would let you leave without paying tribute?')
      }
      else {
        res.send('otsukare sama desu!')
      }
    })
  }
  else {
    res.send('you were never here to begin with') 
  }
})


//export
module.exports = router;