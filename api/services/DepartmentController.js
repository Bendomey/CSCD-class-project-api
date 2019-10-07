const mongoose = require('mongoose');

//models
const Department = mongoose.model('Department');

exports.sanitize_body = (req, res, next) => {
    req.sanitizeBody('name').toString();
    req.sanitizeBody('code').toString();
    req.checkBody('name', 'Department name field cannot be empty').notEmpty();
    req.checkBody('code', 'Department code field cannot be empty').notEmpty();
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

exports.create = async (req, res) => {
    let dept = new Department(req.body);
    await dept.save();
    return res
        .status(200)
        .json({
            ok:true,
            error:false,
            success:true,
            data:dept
        });
};

exports.readAll = async(req, res) => {
    let dept = await Department.find();
    return res
        .status(200)
        .json({
            ok:true,
            error:false,
            success:true,
            data:dept
        })
}