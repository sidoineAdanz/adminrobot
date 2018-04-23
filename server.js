//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist'));
app.use('/user',express.static(__dirname + '/dist'));
app.use('/maps',express.static(__dirname + '/dist'));
app.use('/questionpub',express.static(__dirname + '/dist'));
app.use('/showprofil',express.static(__dirname + '/dist'));
console.log ("gg");
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

console.log ("gg");