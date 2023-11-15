/*
  * Quick script to concat book summaries
  * Usage: node src/scripts/concatBooks.js
  * */

const fs = require('fs');
const path = require('path');

const books1 = require("../Booky/books1.json");
const books2 = require("../Booky/books2.json");
const books3 = require("../Booky/books3.json");
const books4 = require("../Booky/books4.json");

const OUT_PATH = path.join(__dirname, "../Booky/all_books.json");

const summaries = [...books1, ...books2, ...books3, ...books4]
const jsonContent = JSON.stringify(summaries.filter(x => x), null, 2);
fs.writeFile(OUT_PATH, jsonContent, 'utf8', (err) => {
  if (err) {
    console.log("An error occurred while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("Done!");
});
