const express= require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    //console.log('in other middleware');
    res.send('<h1>Hello from Node js</h1>');

});

module.exports=router;