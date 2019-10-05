const mongoose = require('mongoose');

const DepartmenteSchema = mongoose.Schema({
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
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals: true
    }
});

const Department = mongoose.model('Department', DepartmenteSchema);

module.exports = Department;