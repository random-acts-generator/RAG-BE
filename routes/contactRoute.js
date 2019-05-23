const express = require('express');
const router = express.Router();

const Contacts = require('../data/models/contactModel');

//err messages
const newError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

const missingError = (res) => {
  res.status(404).json({ message: "This contact is missing"})
}

//middleware
const requestOptions = {
  headers: { accept: 'application/json' },
};

//CRUD requests
//get actions
router.get('/', (req, res) => {
  Contacts
  .get()
  .then( contact => {
    res.status(200).json( contact );
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//by id
router.get('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Contacts
  .getById(ID)
  .then( contact => {
    if(contact === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json( contact );
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//create request
router.post('/', (req, res) => {
  //set req body
  const { contactFirst, contactLast, contactPhone, relation, user_id } = req.body;
  const newContact = { contactFirst, contactLast, contactPhone, relation, user_id };

  //check req body
  if ( !contactFirst || !contactLast || !contactPhone || !relation ) { 
    return newError( 422, 'Missing information!', res );
  }

  Contacts
  .insert(newContact)
  .then( contact => {
    res.status(201).json( contact )
  })
  .catch( err => {
    return newError ( 500, err, res )
  })
})

//update request
router.put('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  //set req body
  const { contactFirst, contactLast, contactPhone, relation, user_id } = req.body;
  const newContact = { contactFirst, contactLast, contactPhone, relation, user_id };

  //check req body
  if ( !contactFirst && !contactLast && !contactPhone && !relation ) { 
    return newError( 406, 'Missing update information!', res );
  }
  Contacts
  .update(ID, newContact) 
  .then( contact => {
    if(contact === undefined || contact.length === 0) {
      return missingError(res);
    }
    else {
      return res.status(202).json( contact );
    }
  })
  .catch( err => {
    return newError( 500, err , res );
  })
})

router.delete('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Contacts
  .getById(ID)
  .then( contact => {
    if(contact === undefined) {
      return missingError(res);
    }
    else {
      Contacts
      .remove(ID)
      .then( () => {
          return res.status(202).json( contact );
      })
      .catch( err => {
        return newError( 500, err, res );
      })
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//export
module.exports = router;