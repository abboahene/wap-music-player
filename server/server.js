const express = require('express');

const app = express();
const songRouter = require('./routes/songsRouter');
const userRouter = require('./routes/usersRouter');
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/songs',songRouter);
app.use('/users',userRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});