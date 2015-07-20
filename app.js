var express     = require('express');
var app         = express();

var marketingCloudIntegration = require('./marketing-cloud-integration');


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function () {
    console.log('Express server running on port: ' + app.get('port'));
});

marketingCloudIntegration.fireSignupEmail('jarmstrong@exacttarget.com', 'firstname', 'lastname');

