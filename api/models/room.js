const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    hallId:{
        type: mongoose.Schema.ObjectId,
        ref:'Hall',
        required: true
    },
    usersId:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }]
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals: true
    }
});

RoomSchema.virtual('hall',{
    ref:'Hall',
    localField:'hallId',
    foreignField:'_id',
    justOne:true
});

RoomSchema.virtual('users',{
   ref:'User',
   localField: 'usersId',
   foreignField: '_id'
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;