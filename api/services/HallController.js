const mongoose = require('mongoose');

//models
const Hall = mongoose.model('Hall');

exports.sanitize_body = (req, res, next) => {
    req.sanitizeBody('name').toString();
    req.sanitizeBody('code').toString();
    req.checkBody('name','Hall name field cannot be empty').notEmpty();
    req.checkBody('code','Hall code field cannot be empty').notEmpty();
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

exports.create = async(req, res) => {
    let hall = new Hall(req.body);
    await hall.save();
    return res.status(200)
        .json({
            ok:true,
            error:false,
            success:true,
            data:hall
        });
};

exports.readAll = async(req, res) => {
    let hall = await Hall.find();
    return res
        .status(200)
        .json({
            ok:true,
            error:false,
            success:true,
            data:hall
        })
}