/*
  * Quick script to extract all slugs from shortform and save
  * them into Booky directory to play with there
  * Usage: node src/scripts/extractSlugs.js
  * */

require('dotenv').config();

const fs = require('fs');
const path = require('path');

function doFetch(url) {
  return new Promise((resolve, reject) => {
    fetch("https://www.shortform.com/api/books/", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": process.env.SHORTFORM_AUTH,
        "sec-ch-ua": process.env.SHORTFORM_UA,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-sf-client": "11.8.0",
        "Referer": "https://shortform.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(response => response.json())
      .then(jsonData => resolve(extractSlugs(jsonData.data)))
      .catch(error => reject(error))
  })
}

function extractSlugs(data) {
  if (!data) { return }
  return data.map(x => x.url_slug);
}

const API_URL = "https://www.shortform.com/api/books"

async function doWork() {
  const slugs = await doFetch(API_URL);
  const jsonContent = JSON.stringify(slugs.filter(x => x), null, 2);
  const outPath = path.join(__dirname, "../Booky/slugs.json");

  fs.writeFile(outPath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.log("An error occurred while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("Done!");
  });
}

doWork();

