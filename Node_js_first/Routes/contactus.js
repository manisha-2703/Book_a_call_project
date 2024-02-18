const path=require('path');

const express= require('express');
// const rootDir=require('../util/path');
const contactcontroller =require('../controllers/contact');
const router = express.Router();

router.get('/contactus',contactcontroller.getContactDetails);

router.post('/contactus',contactcontroller.postSuccess );

router.get('/success',contactcontroller.getSucess );

module.exports = router;
