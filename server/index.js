const express = require('express');
const app = express();

const db = require('./models')

const cors = require('cors');

app.use(express.json());
app.use(cors());


const usersRouter = require("./routes/Users")
app.use('/auth', usersRouter);

const postsRouter = require('./routes/Posts')
app.use('/posts', postsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server running on port 3001');
    });
});