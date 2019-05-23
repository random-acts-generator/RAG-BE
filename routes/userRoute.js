const express = require('express');
const router = express.Router();

const Users = require('../data/models/userModel');

//err messages
const newError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

const missingError = (res) => {
  res.status(404).json({ message: "This account is missing"})
}

//middleware
const requestOptions = {
  headers: { accept: 'application/json' },
};

//CRUD requests
//get actions
router.get('/', (req, res) => {
  Users
  .get()
  .then( account => {
    res.status(200).json({ account });
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//by id
router.get('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Users
  .getById(ID)
  .then( account => {
    if(account === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ account });
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//by phone number
router.get('/search/num', (req, res) => {
  //set phone number
  const number = req.body.phone
  
  Users
  .getByNumber(number)
  .then( account => {
    if(account === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ account });
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//by first and last name
router.get('/search/name', (req, res) => {
  //set name credentials
  const first = req.body.first
  const last = req.body.last
  
  Users
  .getByName(first, last)
  .then( account => {
    if(account === undefined || account.length === 0) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ account });
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//get contacts
router.get('/:id/contacts', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Users
  .userContacts(ID)
  .then( contacts => {
    if(contacts === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ contacts });
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//get acts
router.get('/:id/acts', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Users
  .userActs(ID)
  .then( acts => {
    if(acts === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ acts });
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//update request
router.put('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  //set req body
  const { first, last, phone, email, password } = req.body;
  const newAccount = { first, last, phone, email, password };

  //check req body
  if ( !first && !last && !phone && !email && !password ) { 
    return newError( 406, 'Missing update information!', res );
  }
  Users
  .update(ID, newAccount) 
  .then( account => {
    if(account === undefined) {
    return missingError(res);
    }
    else {
      return res.status(202).json({ account });
    }
  })
  .catch( err => {
    return newError( 500, err , res );
  })
})

router.delete('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Users
  .getById(ID)
  .then( account => {
    if(account === undefined) {
      return missingError(res);
    }
    else {
      Users
      .remove(ID)
      .then( deleted => {
          return res.status(202).json({ account });
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