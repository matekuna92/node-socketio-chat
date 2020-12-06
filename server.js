const express = require('express');
const port = 3000;

const bodyParser = require('body-parser');
const app = express();
// creating regular http server, shared with express and socketIO
// we cant directly serve backend with just Express any longer, we use Node HTTP server,
// so both Express and socketIO will be running
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const dbUrl = 'mongodb://admin:admin@ds139197.mlab.com:39197/nodejs_socketio';

// schema definition, which is an object with the definitions
let MessageModel = mongoose.model('Message', {
	name: String,
	message: String
})

app.use(express.static(__dirname));

// express cant parse request bodies, need this package
// we expect json format coming in with the HTTP requests:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, (err) => {
		console.log('mongo db connected', err);
})

let server = http.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});

app.get('/messages', (req, res) => {
	MessageModel.find({}, (err, messages) => {	// find all messages
		res.send(messages);
	});
})

app.post('/messages', (req, res) => {
	// create object based on the mongo Model
	let message = new MessageModel(req.body);

	message.save( (err) => {
	    if(err) {
	    	res.sendStatus(500);
	    }

			io.emit('message', req.body);
	    res.sendStatus(200);
	});
})

io.on('connection', socket => {
	console.log('user connected');
})
