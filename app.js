var express     = require('express');
var bodyParser = require('body-parser')
var app         = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist'));

require('./routes.js')(app);

app.listen(app.get('port'), function () {
    console.log('Express server running on port: ' + app.get('port'));
});

