var Q           = require('q');
var WebCollect  = require('../../../web-collect.js');

module.exports = function (app) {
    
    app.post('/api/v1/newsletter/signup', function (req, res) {
        
        
        /*
            Web Collect requires first name, last name, and email address.  

            http://help.exacttarget.com/en/documentation/exacttarget/subscribers/web_collect/
         
            Since we are not getting first and last name, I am defaulting to a blank space
         */
        
        var subscriber = {
            'First Name': req.body.firstName || ' ',
            'Last Name':  req.body.lastName || ' ',
            'Email Address': req.body.emailAddress
        };
        
        var webCollect = new WebCollect();
        
        webCollect.signUpSubscriber(subscriber).then(function() {
            res.send({ status: 'success'});
        }, function (error) {
            res.status(500).send(error);
        });
        
    });
}
