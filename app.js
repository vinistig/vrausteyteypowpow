/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var http = require('http');
var express = require('express');
var WebSocket = require('ws');
var bodyParser = require('body-parser');
var pedido = require('./models/pedido');

//pega todos os pedidos
var pedidos = pedido.getAll()


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
var _ws;

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(bodyParser.json())

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.get('/pedidos', function(req, res){
	res.json(pedidos);
})

app.post('/pedido/create', function(req, res){
	pedido.create(req.body);
});

app.post('/pedido/update', function(req, res){
	pedido.update_reaj_status(req.body);
});
app.post('/pedido/cancel', function(req, res){
	pedido.cancel(req.body);
});

app.post('/adiar/:id', function(req, res){
	var pedidoId = req.id;


	pedidos = pedido.getAll();

	_ws.send('pedidos', pedidos);

});


wss.on('connection', (ws) => {
	_ws = ws;

    //connection is up, let's add a simple simple event
    
});


