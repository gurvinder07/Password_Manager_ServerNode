//INCLUDING EXPRESS PACKAGE
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

//CREATE AN EXPRESS APP
const app = express();
app.use(cors());
connectDB();

//SET THE MIDDLEWARE TO PARSE DATA 
app.use(express.json({ extended: false }));

//API ROUTES 
app.use('/api/websites',require('./routes/api/website'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

//SETTING PORT OF THE SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});
