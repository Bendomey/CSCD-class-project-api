const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//get models
const User = mongoose.model('User');

exports.sanitize_body = (req, res, next) => {
    //get user data
    req.sanitizeBody(req.body.first_name).toString();
    req.sanitizeBody(req.body.last_name).toString();
    req.checkBody('firstName', 'First name field cannot be empty').notEmpty();
    req.checkBody('lastName','Last name field cannot be empty').notEmpty();
    req.checkBody('gender','Gender field cannot be empty').notEmpty();
    req.checkBody('dob','Date of birth cannot be empty').notEmpty();
    req.checkBody('userType','User Type field cannot be empty').notEmpty();
    let errors = req.validationErrors();
    if(errors){
        //bad input
        return res.status(400)
            .json({
            ok:false,
            error:errors,
            success:false
        })
    }
    next();
};

exports.generateAuth = (req, res, next) => {
    if(req.body.departmentID == ''){
      req.body.departmentID = null;
    }
    req.body.id = generateID();
    req.body.pin = generatePin();
    next();
};


exports.register = async (req, res) => {
    let user = await User.findOne({id:req.body.id});
    if(user){
        return res.status(400)
            .json({
                ok:false,
                error:"User already exists",
                success:false
            });
    }
    //create user
    let newUser = new User(req.body);
    let pin = newUser.pin;

    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUser.pin, salt, (err, hash)=>{
          if(err) throw err;
          newUser.pin = hash;
          newUser.save()
              .then((userData)=>{
                  return res.status(200)
                      .json({
                          ok:true,
                          error:false,
                          success:true,
                          data:userData,
                          auth:{
                              pin:pin
                          }
                      });
              })
              .catch((err) => {
              throw err;
          })
       });
    });
};

exports.sanitize_login = (req, res, next) => {
  req.sanitizeBody('id').toString();
  req.sanitizeBody('pin').toString();
  req.checkBody('id','Id field cannot be empty').notEmpty();
  req.checkBody('pin','Pin field cannot be empty').notEmpty();
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


exports.login = async (req, res) => {
    let user = await User.findOne({
        id:req.body.id
    });
    if(!user){
        return res.status(401)
            .json({
                ok:false,
                error:"Your Id or Pin is wrong",
                success:false
            });
    }

    //compare
    bcrypt.compare(req.body.pin, user.pin, (err, isMatch) => {
       if(isMatch){
           return res.status(200)
               .json({
                   ok:true,
                   error:false,
                   success:true,
                   data:user
               });
       }
       return res.status(401)
           .json({
               ok:false,
               error:'Your Id or Pin is wrong',
               success:false
           });
    });
};

const generateID = () => {
    let ID = Math.random() * (Math.floor(10800000) - Math.ceil(10300000)+1) + Math.ceil(10300000);
    return ID.toFixed(0);
};

const generatePin = () =>{
    let pin = Math.random() * (Math.floor(90000) - Math.ceil(10000)+1) + Math.ceil(10000);
    return pin.toFixed(0);
};