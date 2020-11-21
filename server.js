const express = require('express');
const port = 3000;

const bodyParser = require('body-parser');
const app = express();
// creating regular http server, shared with express and socketIO
// we cant directly serve backend with just Express any longer, we use Node HTTP server,
// so both Express and socketIO will be running
const http = require('http').Server(app);
const io = require('socket.io')(http);

let messages = [
	{name: 'Mate', message: 'Hey'},
	{name: 'Adam', message: 'Hello there'}
]

app.use(express.static(__dirname));
let server = http.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});

// express cant parse request bodies, need this package
// we expect json format coming in with the HTTP requests:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => { 
	res.send(messages);
})

app.post('/messages', (req, res) => { 
	messages.push(req.body);
	io.emit('message', req.body);
	res.sendStatus(200);
})

io.on('connection', socket => {
	console.log('user connected');
})