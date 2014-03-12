var express = require('express');
var app = express();
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT

app.get('/test', function(req, res) {
  res.statusCode = 404;
  return res.send('access denied');
});

app.listen(process.env.PORT || 8000);