var RestClient = require('node-rest-client').Client;
var clientId = process.env.clientId || 'SET clientId Environment Var';
var clientSecret = process.env.clientSecret || 'SET clientId Environment Var';

client = new RestClient();
// registering remote methods
client.registerMethod("jsonMethod", "http://google.com/", "GET");
client.registerMethod('authenticate', 'https://auth.exacttargetapis.com/v1/requestToken', 'POST');

exports.fireSignupEmail = function(emailAddress) {
    console.log('Firing email to ' + emailAddress);

    var authArgs = {
        data: { clientId: 'wf7yq9cdxknsueeescm87mkj', clientSecret: '7My96mxqYF9MZrnDCcx9ZdvR' },
        headers: { 'Content-Type': 'application/json' }
    }

    client.methods.authenticate(authArgs, function(data, response) {
        console.log(data);
        console.log(response);
    });

    /*
    client.methods.jsonMethod(function(data,response){
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
    */
};
