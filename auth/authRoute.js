//import the dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import the model, router, and function
const Users = require('../data/models/userModel');
const Contacts = require('../data/models/contactModel');
const Acts = require('../data/models/raModel');
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
  .insert(user, 'id')
  .then( newUser => {
    res.status(201).json(newUser)

    // let defaults = [
      
    // ]
    let mom = {contactFirst: 'my', contactLast: 'mom', contactPhone: '000-999-8888', relation: 'family', user_id: newUser.id}
    let dad = {contactFirst: 'my', contactLast: 'dad', contactPhone: '000-555-8888', relation: 'family', user_id: newUser.id}
    let best = {contactFirst: 'best', contactLast: 'friend', contactPhone: '222-999-8888', relation: 'friend', user_id: newUser.id}
    //autofill mom, dad, and best friend
    Contacts.insert(mom)
    Contacts.insert(dad)
    Contacts.insert(best)
  
    let cook =  {description: 'Cook them dinner.', related: 'family', user_id: newUser.id}
    let book =  {description: "Pass along a wonderful book you've finished reading.", related: 'family', user_id: newUser.id}
    let card =  {description: 'Send them a card.', related: 'family', user_id: newUser.id}
    let compliment =  {description: 'Compliment them.', related: 'family', user_id: newUser.id}
    let hug =  {description: 'Give them a hug.', related: 'friend', user_id: newUser.id}
    let coffee =  {description: 'Pay for their coffee.', related: 'friend', user_id: newUser.id}

    //autofill acts
    Acts.insert(cook)
    Acts.insert(book)
    Acts.insert(card)
    Acts.insert(compliment)
    Acts.insert(hug)
    Acts.insert(coffee)
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