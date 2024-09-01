const express = require('express');
const app = express();

const db = require('./models')
const cors = require('cors');

const path = require('path')

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const usersRouter = require("./routes/Users")
app.use('/auth', usersRouter);

const postsRouter = require('./routes/Posts')
app.use('/posts', postsRouter);

const followersRouter = require('./routes/Followers');
app.use('/follow', followersRouter)

const resetPasswordsRouter = require('./routes/ResetPassword');
app.use('/password', resetPasswordsRouter) 

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

const likesRouter = require('./routes/Likes');
app.use('/likes', likesRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server running on port 3001');
    });
});