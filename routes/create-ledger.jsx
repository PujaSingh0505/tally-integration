const express = require('express');
const {createLedger} = require('../xml/imports/create_ledger');


//routr objects
const router = express.Router();


//routes
//Login || Post
router.post('/ledger',createLedger);


