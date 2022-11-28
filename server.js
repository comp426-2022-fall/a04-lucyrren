import { roll } from "./lib/roll.js";
import minimist from "minimist";
import express from "express";

//parse arguments 
let args = minimist(process.argv.slice(2));

//sets port to port argument or default 5000
const port = args.port || 5000;

let app = express();

//accept either JSON or URL Encoded
app.use(express.urlencoded({extended: true}));

//listen on designated port
app.listen(port);

//endpoint at /app returns 200 OK
app.get('/app', (req, res) => {
    res.status(200).send('200 OK');
});

//endpoint at /app/roll for a default roll
app.get('/app/roll', (req, res) => {
    res.status(200).send(JSON.stringify(roll(6, 2, 1)));
});

let sides, dice, rolls;

//endpoint at /app/roll for roll with JSON or URL encoded data body
app.post('/app/roll/', (req, res) => {
    sides = parseInt(req.body.sides);
    dice = parseInt(req.body.dice);
    rolls = parseInt(req.body.rolls);
    res.status(200).send(JSON.stringify(roll(sides, dice, rolls)));
});

//endpoint at /app/roll/:sides for roll that takes in a sides parameter
app.get('/app/roll/:sides', (req, res) => {
    sides = parseInt(req.params.sides);
    res.status(200).send(JSON.stringify(roll(sides, 2, 1)));
});

//endpoint at /app/roll/:sides/:dice that takes in sides and dice parameter
app.get('/app/roll/:sides/:dice/', (req, res) => {
    sides = parseInt(req.params.sides);
    dice = parseInt(req.params.dice)
    res.status(200).send(JSON.stringify(roll(sides, dice, 1)));
});

//endpoint at /app/roll/:sides/:dice/:rolls that takes in sides, dice, and roll parameter
app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {
    sides = parseInt(req.params.sides);
    dice = parseInt(req.params.dice);
    rolls = parseInt(req.params.rolls);
    res.status(200).send(JSON.stringify(roll(sides, dice, rolls)));
});

//returns 404 when endpoint is not defined
app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
});
