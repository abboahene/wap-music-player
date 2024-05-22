const Song = require('../models/song');
const User = require('../models/user');

exports.getAll = (req,res,next)=>{
    User.checkUser(req.username);
    const data ={
        status:'success',
        data:Song.getAll()
    }
    res.status(200).json(data);
}