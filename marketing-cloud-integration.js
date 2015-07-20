var RestClient = require('node-rest-client').Client;
var clientId = process.env.clientId || 'SET clientId Environment Var';
var clientSecret = process.env.clientSecret || 'SET clientId Environment Var';
var

client = new RestClient();
// registering remote methods
client.registerMethod("jsonMethod", "http://google.com/", "GET");
client.registerMethod('authenticate', 'https://auth.exacttargetapis.com/v1/requestToken', 'POST');
client.registerMethod('messageDefinitionSend', 'https://www.exacttargetapis.com/messaging/v1/messageDefinitionSends/key:GenCon2015-Signups/send', 'POST');

exports.fireSignupEmail = function(emailAddress, firstName, lastName) {
    console.log('Firing email to ' + emailAddress);

    var authArgs = {
        data: { clientId: clientId, clientSecret: clientSecret },
        headers: { 'Content-Type': 'application/json' }
    }

    var token;

    client.methods.authenticate(authArgs, function(data, response) {
        if (response.statusCode != 200) {
            console.log("Error: Couldn't get accessToken. StatusCode was " + response.statusCode);
            return;
        }

        token = data.accessToken;
        console.log('Got token: ' + token);

        var triggeredSendArgs = {
            data: {
                "To" :  {
                    "Address" : emailAddress,
                    "SubscriberKey" : "TriggeredSendTestSubscriber02"
                },
                "ContactAttributes": {
                    "SubscriberAttributes": {
                        "FirstName": "Josh",
                        "LastName": "Armstrong"
                    }
                }
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        client.methods.messageDefinitionSend(triggeredSendArgs, function(data, response) {
            console.log(data);
            console.log(response);
            console.log('Triggered Send status: ' + response.statusCode);
        });
    });

};

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
