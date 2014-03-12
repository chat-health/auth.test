var express = require('express');
var app = express();
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
// var authenticated = false;

app.get('/test', function(req, res) {
  var googleToken = req.param('google_access_token');

  if (googleToken === "armin") {
    res.json({'hello':'world'})
  } else {
    res.statusCode = 404;
    return res.send('access denied');
  }
});

app.listen(process.env.PORT || 8000);