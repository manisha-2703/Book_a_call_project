const path = require('path');

const express = require('express');

const productsController=require('../controllers/products');
//const rootDir = require('../util/path');

const router = express.Router();



// /admin/add-product => GET
router.get('/admin/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/admin/add-product',productsController.postAddProducts);

module.exports=router;


/* const path=require('path');
const express= require('express');

const rootDir=require('../util/path');

const router = express.Router();


router.get('/add-product',(req,res,next)=>{
    //console.log('in other middleware');
    //console.log('Admin module get loaded');
    res.sendFile(path.join(rootDir,'Views','add-product.html'))

});

router.post('/add-product',(req,res,next)=> {
    //console.log('Admin module post loaded');
    console.log(req.body);
    res.redirect('/');
    


}); */



module.exports=router;