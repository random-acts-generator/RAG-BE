//import the server and dotenv
const server = require('./server');
require('dotenv').config();

//create a dynamic port
const PORT = process.env.PORT || 3300;

//listen for the port and generate a working message
server.listen(PORT, () => {
  console.log(`\n We are up and running on ${PORT} sir! \n`);
})
