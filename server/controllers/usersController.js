const User = require('../models/user');

exports.login = (req,res,next)=>{
    const result = {
        status:'success',
        data:User.login(req.body.username,req.body.password)
    }

    res.status(200).json(result);
}