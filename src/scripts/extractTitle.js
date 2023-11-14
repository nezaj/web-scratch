/*
  * Quick script for extracting book titles from readthistwice
  * Usage: node src/scripts/extractTitle.js
  * */
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');
const { JSDOM } = jsdom;

async function fetchCompleteHTML(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Optional: Scroll to trigger loading of dynamic content
  await autoScroll(page);

  const pageContent = await page.content();
  await browser.close();
  return pageContent;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

function extractTextByClass(html, className) {
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('.' + className);
  return Array.from(elements).map(el => el.textContent.trim()).join("\n");
}

// Usage example
const url = 'https://www.readthistwice.com/lists/best-startup-books';
const className = 'styles_title__0l_Rn';
const outputFilePath = path.join(__dirname, 'books.txt');

fetchCompleteHTML(url).then(html => {
  const extractedTexts = extractTextByClass(html, className)
  fs.writeFileSync(outputFilePath, extractedTexts);
  console.log("Wrote books to", outputFilePath);
});
