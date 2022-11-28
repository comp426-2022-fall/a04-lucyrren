import { roll } from "../lib/roll.js";
import minimist from "minimist";
import express from "express";

let args = minimist(process.argv.slice(2));

const port = args.port || 5000;

let app = express();
app.use(express.urlencoded({extended: true}));

app.get('/app', (req, res) => {
    res.type('html');
    res.status(200).send('200 OK');
});

app.get('/app/roll', (req, res) => {
    res.send(JSON.stringify(roll(6, 2, 1)));
});

app.post('/app/roll/', (req, res) => {
    res.send(JSON.stringify(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls))));
});