const mongoose = require('mongoose');

//models
const User = mongoose.model('User');
const Hall = mongoose.model('Hall');
const Room = mongoose.model('Room');

exports.sanitize_room = (req, res, next) => {
    req.sanitizeBody('hallId').toString();
    req.checkBody('hallId','Hall ID field cannot be empty').notEmpty();
    let errors = req.validationErrors();
    if(errors){
        //bad request
        return res.status(400)
            .json({
                ok:false,
                error:errors,
                success:false
            });
    }

    next();
};

exports.generateRoom = async(req, res, next) => {

    let hall = await Hall.findOne({
        _id:req.body.hallId
    });
    // return res.json(hall)
    req.body.name = generate(hall.code);
    next();
};


exports.create = async(req, res) => {
    let room = new Room(req.body);
    await room.save();
    return res.status(200)
        .json({
            ok:true,
            error:false,
            success:true,
            data:room
        });
};

exports.applyToRoom = async (req, res) => {
    let user = await User.findOne({
        _id:req.body.id
    });
    let room = await Room.findOne({
        _id:req.body.roomId
    });
    if(room.usersId.length < 4){
        if(!room.usersId.includes(user._id)){
            await room.update({
                $push:{
                    usersId: user._id
                }
            });
            return res.status(200)
                .json({
                    ok:true,
                    error:false,
                    success:true,
                    data:room,
                });
        }
        return res.status(400)
            .json({
                ok:false,
                error:'User already registered under this room',
                success:false,
            });

    }
    return res.status(400)
        .json({
            ok:false,
            error:"Room is full",
            success:false
        });

};

exports.removeFromRoom = async(req, res) => {
    let user = await User.findOne({
      _id:req.body.id
    });
    let room = await Room.findOne({
      _id:req.body.roomId
    });
    if(room.usersId.includes(user._id)){
      await room.update({
          $pull:{
              usersId:user._id
          }
      });
        return res.status(200)
            .json({
                ok:true,
                error:false,
                success:true,
                data:room,
            });
    }
    return res.status(400)
        .json({
            ok:false,
            error:"User is not registered here",
            success:false
        });
};

const generate = (code) => {
    let room = Math.random() * (Math.floor(9000) - Math.ceil(1000)+1) + Math.ceil(1000)
    return code + room.toFixed(0).toString();
};