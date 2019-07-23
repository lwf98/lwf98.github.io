let express = require('express');
let app = express();
let path = require('path');
let router = require('./routes/router.js');
let bodyParser = require('body-parser');
app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use('/public/', express.static(path.join(__dirname, './public')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')));

app.use(router);

app.listen(3000, function () {
    console.log('Server is running on 3000');
});
