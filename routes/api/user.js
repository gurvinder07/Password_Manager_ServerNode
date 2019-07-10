const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
var bcryptJs = require('bcryptjs');


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , masterPassword} = req.body;

    try {


      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
     
      user = new User({
        name,
        email,
        password,
        masterPassword
      });

      const salt = await bcrypt.genSalt(10);
     
      
      user.password = await bcrypt.hash(password, salt);
      var hashedPass = await bcryptJs.hash(masterPassword,10);
      user.masterPassword = hashedPass;

      await user.save();

console.log("hashed pass=" + hashedPass);
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          masterPassword:hashedPass

        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.get("/",async (req,res)=>{
try{
  const list = await User.find();
  res.json(list);
}catch(err)
{
  res.status(500).send('server error');
}
});

router.get("/:email&:pass",async (req,res)=>{
  try{

    const email = req.params.email;
    let user = await User.findOne({ email });
    console.log(req.params.pass)
    if(user!=null)
    {
    const isMatch = await bcrypt.compare(req.params.pass, user.password);
    console.log(isMatch)

    if(isMatch)
    {
     res.json(user);
    }
    else
    {
      res.json("Invalid Password" + req.params.password);
    }
  }

   else
   {
     res.json("Invalid User Name");
   }
  }catch(err)
  {
    console.log(err);
    res.status(500).send('server error');
  }
  });

module.exports = router;
