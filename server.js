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

app.post('/app/roll/', (req, res) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls))));
});

app.get('/app/roll/:sides', (req, res) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), 2, 1)));
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
