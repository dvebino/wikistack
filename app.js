const express = require('express');
const morgan = require('morgan');
const app = express();
const wiki_router = require('./routes/wiki');
const user_router = require('./routes/users');

const port = 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/wiki', wiki_router);
app.use('/users', user_router);

const {db,Page,User} = require('./models');


const init = async () => {
    await db.sync({force:true});

    app.listen(port, () => {
        console.log('Server is listening on port:' + port);
    });
}
init();

app.get('/',(req,res) => {
    res.redirect('/wiki');
})



