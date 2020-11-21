const express = require('express');
const port = 3000;

let bodyParser = require('body-parser');
let app = express();
let messages = [
	{name: 'Mate', message: 'Hey'},
	{name: 'Adam', message: 'Hello there'}
]

app.use(express.static(__dirname));
let server = app.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});

// express cant parse request bodies, need this package
// we expect json format coming in with the HTTP requests:
app.use(bodyParser.json());

app.get('/messages', (req, res) => { 
	res.send(messages);
})

app.post('/messages', (req, res) => { 
	console.log(req.body);
	res.sendStatus(200);
})