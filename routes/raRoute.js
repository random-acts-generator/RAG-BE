const express = require('express');
const router = express.Router();

const Acts = require('../data/models/raModel');

//err messages
const newError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

const missingError = (res) => {
  res.status(404).json({ message: "This act is missing"})
}

//middleware
const requestOptions = {
  headers: { accept: 'application/json' },
};

//CRUD requests
//get actions
router.get('/', (req, res) => {
  Acts
  .get()
  .then( act => {
    res.status(200).json( act );
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//by id
router.get('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Acts
  .getById(ID)
  .then( act => {
    if(act === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json( act );
    }
  })
  .catch( err => {
    return newError( 500, err, res );
  })
})

//create request
router.post('/', (req, res) => {
  //set req body
  const { description, related, user_id } = req.body;
  const newAct = { description, related, user_id };

  //check req body
  if ( !description || !related || !user_id ) { 
    return newError( 422, 'Missing information!', res );
  }

  Acts
  .insert(newAct)
  .then( act => {
    res.status(201).json( act )
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
  const { description, related } = req.body;
  const newAct = { description, related };

  //check req body
  if ( !description && !related ) { 
    return newError( 406, 'Missing update information!', res );
  }
  Acts
  .update(ID, newAct) 
  .then( act => {
    if(act === undefined) {
    return missingError(res);
    }
    else {
      return res.status(202).json( act );
    }
  })
  .catch( err => {
    return newError( 500, err , res );
  })
})

router.delete('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  Acts
  .getById(ID)
  .then( act => {
    if(act === undefined) {
      return missingError(res);
    }
    else {
      Acts
      .remove(ID)
      .then( () => {
          return res.status(202).json( act );
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