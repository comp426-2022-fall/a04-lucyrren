import { roll } from "../lib/roll.js";
import minimist from "minimist";
import express from "express";

let args = minimist(process.argv.slice(2));

const port = args.port || 5000;