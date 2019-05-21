//import the dependencies
const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import the model, router, and function
const Users = require('../data/models/userModel');
const { permissions } = require('./permissions');
const router = express.Router();

//creating a token
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.email
  }
  const secret = process.env.SECRET
  const options = { 
    expiresIn: '20h'
  }

  return jwt.sign(payload, secret, options)
}



//CRUD requests
//register 
router.post('/register', ( req, res ) => {
  // implement user registration
  const { first, last, phone, email, password } = req.body
  const user = { first, last, phone, email, password }
  
  //check req body
  if ( !first || !last || !email || !password ) {
    return res.status(422).json({ message: 'Missing vital information' })
  }
  
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
  const { first, last, phone, email, password } = req.body

  Users
  .loginCheck( email )
  .then( user => {
    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `Welcome ${user.first}`, 
        token,
        user
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

//users
router.get('/jokes', (req, res) => {
  const requestOptions = {
  headers: { accept: 'application/json' },
  };

axios
  .get('https://icanhazdadjoke.com/search', requestOptions)
  .then(response => {
    res.status(200).json(response.data.results);
  })
  .catch(err => {
    res.status(500).json({ message: 'Error Fetching Jokes', error: err });
  });
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