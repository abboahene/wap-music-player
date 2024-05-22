const express = require('express');

const app = express();
const songRouter = require('./routes/songsRouter');
const userRouter = require('./routes/usersRouter');
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use((req,res,next)=>{
    if(req.url==='/users/login'){
        next();
    }else{
        if(!req.headers.authorization){
            return res.status(403).json({status:'failed',error:'No credentails sent!'});
        }
        const token = req.headers.authorization.split('@')[0];
        req.username = token;
        next()
    }
    
});
app.use('/songs', songRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    if (err.message.includes('not found')) {
        res.status(404).json({
            status: 'failed',
            error: err.message
        })
    } else {
        res.status(500).json({
            status: 'failed',
            error: err.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});