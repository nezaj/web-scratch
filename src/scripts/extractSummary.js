/*
  * Quick script for extractSummary summaries from shortform
  * Usage: node src/scripts/extractSummarySummary.js
  * */

require('dotenv').config();

const fs = require('fs');
const path = require('path');

function fetchSummary(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": process.env.SHORTFORM_AUTH,
        "sec-ch-ua": process.env.SHORTFORM_UA,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "x-sf-client": "11.8.0"
      },
      "referrer": "https://shortform.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(response => response.json())
      .then(jsonData => resolve(extractSummary(jsonData.data)))
      .catch(error => reject(error))
  })
}

function extractSummary(data) {
  if (!data) { return }
  const { cover_image, title, author, tags, url_slug } = data
  const html = data.content[0].text
  return {
    cover_image: "https:" + cover_image,
    title,
    author,
    tags,
    url_slug,
    html
  }
}

const API_URL = "https://www.shortform.com/api/books"
const slugs = [
  "chip-war",
  "the-design-of-everyday-things",
  "the-innovator-s-dilemma",
  "sex-at-dawn",
  "the-hero-with-a-thousand-faces"
]

async function doWork() {
  const summaries = await Promise.all(slugs.map(slug => fetchSummary(`${API_URL}/${slug}`)));
  const jsonContent = JSON.stringify(summaries.filter(x => x), null, 2);
  const outPath = path.join(__dirname, "../Booky/books.json");

  fs.writeFile(outPath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.log("An error occurred while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("Done!");
  });
}

doWork();
