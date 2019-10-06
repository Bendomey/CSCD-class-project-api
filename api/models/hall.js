const mongoose = require('mongoose');

const HallSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

const Hall = mongoose.model('Hall', HallSchema);

module.exports = Hall;