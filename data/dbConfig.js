//import knex dependency and knexfile for the configurations
const knex = require('knex');
const knexConfig = require('../knexfile');

//define the db to be dynamic depending on if you are testing, building, production
const dbEnv = process.env.DB_ENV || 'developement';

//export
module.exports = knex(config[dbEnv]);