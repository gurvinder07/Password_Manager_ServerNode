const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    date:{ 
        type: Date,
        default: Date.now,
        
    },

    email:{
        type : String,
        required: true

    },

    password:{
    type: String,
    required : true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
});
module.exports= Website = mongoose.model('Website',PostSchema);