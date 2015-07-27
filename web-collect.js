var Q               = require('q');
var http            = require('http');
var querystring     = require('querystring');
var _               = require('underscore');

module.exports = function () {
    var self = this;
    
    self.signUpSubscriber = function (subscriber) {
        return Q.Promise(function (resolve, reject, notify) {

            var postData = { MID: process.env.MID || 6181710 };
            _.extend(postData, subscriber);
            postData = querystring.stringify(postData);

            var requestOptions = {
                host: 'cl.s6.exct.net',
                path: '/subscribe.aspx?lid=20257',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                },
                method: 'POST'
            };
            
            var req = http.request(requestOptions, function (response) {
                
                processResponse(response).then(resolve, reject);
                
            });
            
            req.write(postData);
            req.end();
                
            
        });
    };
    
    function processResponse(response) {
        return Q.Promise(function (resolve, reject, notify) {
            
            if (response && response.headers && response.statusCode === 302) {  //redirection mean success
                
                var location = response.headers.location;

                if (location.indexOf('app_thankyou.aspx') !== -1) {
                    resolve();
                } else if (location.indexOf('app_error.aspx') !== -1) {

                    var uri = require('url').parse(location, true);
                    if (uri.query && uri.query.errorcode === '8') {  //8 = duplicate subscriber
                        reject({ message: 'Subscriber already exists.' });
                    } else {
                        reject({ message: 'Unable to add subscriber.' });
                    }

                }
                
            } else {
                reject({ message: 'Unable to communicate with Web Collect.' });
            } 

        });
    }
    
    return self;
}