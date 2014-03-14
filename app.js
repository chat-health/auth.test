var express = require('express');

var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;

var app = express();
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
// var authenticated = false;

var CLIENT_ID = '55000252691-rvdv769veahs88jub2v0s7213p6oom1a.apps.googleusercontent.com';
var CLIENT_SECRET = 'vyujyWl2CU5boee_SQIKtGtP';
var REDIRECT_URL = '';



function getUserProfile(client, authClient, userId, callback) {
  client
    .oauth2.userinfo.get()
    .withAuthClient(authClient)
    .execute(callback);
}

app.get('/test', function(req, res) {
  var googleToken = req.param('google_access_token');
  
	googleapis
	 .discover('oauth2', 'v2')
	 .execute(function(err, client) {
		var oauth2Client =new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
		console.log('googleToken: ', googleToken);
		oauth2Client.credentials = {
		  access_token: googleToken
		};
		
		// retrieve user userInfo
		getUserProfile(client, oauth2Client, 'me', function(err, userInfo) {
			
			if (err) {
				res.statusCode = 404;
				return res.json({'An error occured': err});
			}
			res.json(userInfo.email);
		});
	});

});

app.listen(process.env.PORT || 8000);