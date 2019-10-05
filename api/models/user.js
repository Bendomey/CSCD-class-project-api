const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    pin:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        enum:['m','f'],
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    departmentID:{
        type: mongoose.Schema.ObjectId,
        ref:'Department',
        required:true
    },
    userType:{
        type:String,
        enum:['admin','student'],
        required:true
    },
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals: true
    }
});

userSchema.virtual('department',{
    ref:'Department',
    localField:'department',
    foreignField:'_id',
    justOne:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;