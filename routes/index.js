var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var request = require('request');

var clientId = "37a8398b-4789-444c-b043-ebffa2466c34";
var client_secret = "wCIVLG144{qmvoceLV14=]:";
var redirect_uri = "http://localhost:3000/callback";
var scope = "User.Read Tasks.ReadWrite.Shared Tasks.ReadWrite Tasks.Read.Shared Tasks.Read Sites.ReadWrite.All Sites.Read.All";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


});

router.get('/callback', function (req, res) {

    var code = req.query.code;

    var post_data = querystring.stringify({
        'grant_type' : 'authorization_code',
        'client_id': clientId,
        'client_secret': client_secret,
        'redirect_uri' : redirect_uri,
        'code' : code,
        'scope' : scope
    });

    var post_options = {
        host: 'login.microsoftonline.com',
        port: 80,
        path: '/common/oauth2/v2.0/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const options = {
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        form: post_data
    }

    request.post(options, function(err,httpResponse,body){

        var obj = JSON.parse(body);
        res.send(obj.access_token)

    });

});

module.exports = router;
