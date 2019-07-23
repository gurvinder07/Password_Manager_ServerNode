const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Category_Name: {
    type: String,
    required: true
  } 

});



const Categories = mongoose.model('categories', UserSchema);

module.exports = Categories;

