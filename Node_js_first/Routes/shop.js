const path = require('path');

const express = require('express');
const productsController=require('../controllers/products');
//const rootDir = require('../util/path');
//const adminData = require('./admin');

const router = express.Router();

router.get('/',productsController.getProducts);

module.exports = router; 

/* const path=require('path');

const express= require('express');
const rootDir=require('../util/path');
const router = express.Router();


router.get('/', (req,res,next)=>{
    
    res.sendFile(path.join(rootDir,'Views','shop.html'));
    

});

module.exports=router; */