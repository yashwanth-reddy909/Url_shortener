const express= require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Shortners=require('../models/shortner');
var app=express();
const shortnerRouter= express.Router();
shortnerRouter.use(bodyParser.json());

shortnerRouter.route('/')
.get((req,res,next)=>{
    Shortners.find({})
    .then((allShortners)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(allShortners);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    });
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-Type','application/json');
    res.json({"result": "post Not Supported on /shortners"});
})
.post((req,res,next)=>{
    Shortners.create(req.body)
    .then((shortner)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(shortner);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    });
    Shortners.find({})
    .then(shortner2=>{
        if(shortner2.length>=15){
            let j=shortner2[0]._id;
            Shortners.findByIdAndDelete(j)
            .then(h=>{
            },err=>next(err));
        }
    },err=>next(err));
})
.delete((req,res,next)=>{
    Shortners.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicationb/json');
        res.json(resp);
    },err=>next(err))
    .catch((err)=>next(err));
});

shortnerRouter.route('/:shorten')
.get((req,res,next)=>{
    Shortners.findOne({shortWith: req.params.shorten})
    .then((shortner)=>{
        const k= shortner.orgUrl;
        res.redirect(k);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    });
});

module.exports=shortnerRouter;
