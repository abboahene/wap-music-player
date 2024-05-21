const Song = require('../models/song');

exports.getAll = (req,res,next)=>{
    const data ={
        status:'success',
        data:Song.getAll()
    }
    res.status(200).json(data);
}