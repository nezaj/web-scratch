/*
  * Quick script to extract 1 page summaries from shortform and save
  * them into Booky directory to play with there
  * Usage: node src/scripts/extractSummarySummary.js
  * */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const jsonSlugs = require("../Booky/slugs.json");


// Utils
// -----------------
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

function partition(array, n) {
  return array.reduce((accumulator, currentValue, index) => {
    if (index % n === 0) {
      accumulator.push([currentValue]);
    } else {
      accumulator[accumulator.length - 1].push(currentValue);
    }
    return accumulator;
  }, []);
}


// Fetch + Extract
// -----------------
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

async function fetchSummaries(batches, sleepMs) {
  let summaries = [];

  for (const [idx, slugs] of batches.entries()) {
    const prefix = `[${idx + 1}/${batches.length}]`
    console.log(prefix, "Fetching next batch", slugs);
    const newSummaries = await Promise.all(slugs.map(slug => fetchSummary(`${API_URL}/${slug}`)));
    summaries = summaries.concat(newSummaries);
    console.log(prefix, "Fetch complete! Now sleeping for", sleepMs, "ms")
    await sleep(sleepMs)
  }

  return summaries;
}


// Runner
// -----------------
const OUT_PATH = path.join(__dirname, "../Booky/books4.json");
const START_INDEX = 450;
const END_INDEX = 978;
const API_URL = "https://www.shortform.com/api/books"
const PARTITION_SIZE = 10;
const SLEEP_MS = 60000;

async function doWork() {
  const batches = partition(jsonSlugs.slice(START_INDEX, END_INDEX), PARTITION_SIZE);
  const summaries = await fetchSummaries(batches, SLEEP_MS);
  const jsonContent = JSON.stringify(summaries.filter(x => x), null, 2);

  fs.writeFile(OUT_PATH, jsonContent, 'utf8', (err) => {
    if (err) {
      console.log("An error occurred while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("Done!");
  });
}


doWork();
