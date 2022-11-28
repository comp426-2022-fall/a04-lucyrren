import { roll } from "./lib/roll.js";
import minimist from "minimist";
import express from "express";

let args = minimist(process.argv.slice(2));

const port = args.port || 5000;

let app = express();
app.use(express.urlencoded({extended: true}));
app.listen(port);

app.get('/app', (req, res) => {
    res.status(200).send('200 OK');
});

app.get('/app/roll', (req, res) => {
    res.status(200).send(JSON.stringify(roll(6, 2, 1)));
});

let sides, dice, rolls;

app.post('/app/roll/', (req, res) => {
    sides = parseInt(req.body.sides);
    dice = parseInt(req.body.dice);
    rolls = parseInt(req.body.rolls);
    res.status(200).send(JSON.stringify(roll(sides, dice, rolls)));
});

app.get('/app/roll/:sides', (req, res) => {
    sides = parseInt(req.params.sides);
    res.status(200).send(JSON.stringify(roll(sides, 2, 1)));
});

app.get('/app/roll/:sides/:dice/', (req, res) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1)));
});

app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls))));
});

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
});