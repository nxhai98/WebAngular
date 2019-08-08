const express = require('express');
const app = express();
const cors = require('cors')
const userControler = require('./controller/user-controler');
const bodyParser = require('body-parser');
const errorHandle = require('./_helpers/error-handles');

const Catalogs = require('./models/Catalog');
const News = require('./models/News');
const Comment = require('./models/Comment');
const Illustration = require('./models/Illustration');
require('dotenv').config();

Catalogs.createTable();
News.createTable();

Illustration.createTable();
Comment.createTable();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




app.use('/', require('./controller/user-controler'));
app.use('/admin/', require('./controller/catalog-controller'));
app.use('/news/', require('./controller/news-controller'));
app.use('/imgs/', require('./controller/img-controller'));
app.use('/comments/', require('./controller/comment-controller'));
app.use(errorHandle);

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});