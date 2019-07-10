const express =require('express');
const config =require('config');
const Website= require('../../models/Website');
const User= require('../../models/User');
const auth= require('../../middleware/auth');
const db= require('../../config/db');
const Cryptr = require('cryptr');
const bcrypt = require('bcryptjs');





const router=express.Router();
//@route POST api/posts
//@desc Insert New POSTS
//@access Public
router.post('/',auth,async(req,res)=>{
    try {
      const masterPass = req.user.masterPassword;
      const cryptr = new Cryptr(masterPass);
      const encryptedString = cryptr.encrypt(req.body.password);
        const newWebsite = new Website({
            title: req.body.title,
            userName:req.body.userName,
            email:req.body.email,
            password:encryptedString,
            createdBy:req.user.id

        })
    const Post2 = await newWebsite.save();
    res.send(Post2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});
//@route GET api/Websites
//@desc Get all website with related stored information 
//@access Public
router.get('/',auth,async (req,res)=>{
    try {
       const website1 = await Website.find({ createdBy: req.user.id });
      
       res.send(website1); 
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});
router.get('/:id',auth,async (req,res)=>{
  try {
    
     
     const website1 = await Website.find({ createdBy: req.user.id });
  
     const masterPass = req.params.id;
     const cryptr = new Cryptr(req.user.masterPassword);
     await   bcrypt.compare(masterPass, req.user.masterPassword, function(err, result) {
       if(result==true)
       {
        
        website1.forEach(function(obj){

    
          var decPass = cryptr.decrypt(obj.password);
          obj.password = decPass;
         
          
      
        });


       }
       res.send(website1); 
  });
  
  
      
  } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
  }
});


//@route Delete api/task/:id
//@desc Delete task by id One Document at a Time
//@access Public
router.delete('/:id', auth, async (req, res) => {
  try {
    // Remove task

    //await Task.findByIdAndRemove({ _id: req.body.id });
   await Website.findOneAndRemove({ user: req.user.id, _id: req.params.id });
    console.log(x);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/website/
//@desc Update task by id One Document at a Time
//@access Public
router.put('/:id', auth, async (req, res) => {
    try {
      let WebsiteEntry = await Website.findOne({
        user: req.user.id,
        _id: req.body.id
      });
  
      if (!WebsiteEntry) {
        return res.status(404).send('Entry not found');
      }

      const {title,userName,email,password=key.encrypt()}=req.body;
      WebsiteEntry = await Website.findOneAndUpdate
      (
        { _id: id },
        { title: title, userName: userName, email: email,password:password},
        {new:true}
      );
  
      res.send(WebsiteEntry);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });
  
module.exports=router
