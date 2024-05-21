const User = require('../models/user');

exports.login = (req,res,next)=>{
    const result = {
        status:'success',
        data:User.login(req.body.username,req.body.password)
    }

    res.status(200).json(result);
}

exports.getPlayList = (req,res,next)=>{
    const result = {
        status:'success',
        data:User.getPlayList(req.params.username)
    }

    res.status(200).json(result);
}

exports.addSongToPlayList = (req,res,next)=>{
    const result = {
        status:'success',
        data:User.addSongToPlayList(req.params.username,req.params.songId)
    }

    res.status(200).json(result);
}