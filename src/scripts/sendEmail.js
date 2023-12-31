/*
  * Quick script for sending emails via postmark
  * Usage: npx @babel/node src/scripts/sendEmail.js
  * */

require('dotenv').config();
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['transform-require-ignore', {
      extensions: ['.css']
    }]
  ],
  extensions: [".js", ".jsx"],
});

const Postmark = require('postmark');
const juice = require('juice');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const MyComponent = require('../BookSummary/index').default;

// Replace 'your-server-token' with your actual Postmark server token
const client = new Postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Render your React component to a string
const emailHtml = ReactDOMServer.renderToString(React.createElement(MyComponent));

const cssStyles = `
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
 }

html {
    overflow-y: scroll;
    height: 100%;
    font: 100%/1.5 sans-serif;
    word-wrap: break-word;
    margin: 0 auto;
    padding: 1.5em;
 }

@media (min-width: 768px) {
    html {
        font-size: 125%;
        max-width: 42em;
 } }

h1, h2, h3, h4 {
    margin: 2.5rem 0 1.5rem 0;
    line-height: 1.25;
    color: #333;
 }

a {
    color: #fa6432;
    text-decoration: none;
 }
a:hover, a:focus, a:active {
    text-decoration: underline;
 }

p {
    margin: 1em 0;
    line-height: 1.5;
 }
p code {
    background-color: #eee;
    padding: 0.05em 0.2em;
    border: 1px solid #ccc;
 }

ol, ul {
    margin: 1em;
 }
ol li ol, ol li ul, ul li ol, ul li ul {
    margin: 0 2em;
 }
ol li p, ul li p {
    margin: 0;
 }

dl {
    font-family: monospace, monospace;
 }
dl dt {
    font-weight: bold;
 }
dl dd {
    margin: -1em 0 1em 1em;
 }

img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    padding: 0.5em;
 }

blockquote {
    padding-left: 1em;
    font-style: italic;
    border-left: solid 1px #fa6432;
 }

table {
    font-size: 1rem;
    text-align: left;
    caption-side: bottom;
    margin-bottom: 2em;
 }
table * {
    border: none;
 }
table thead, table tr {
    display: table;
    table-layout: fixed;
    width: 100%;
 }
table tr:nth-child(even) {
    background-color: rgba(200, 200, 200, 0.2);
 }
table tbody {
    display: block;
    max-height: 70vh;
    overflow-y: auto;
 }
table td, table th {
    padding: 0.25em;
 }

table, .highlight > pre, pre.example {
    max-height: 70vh;
    margin: 1em 0;
    padding: 1em;
    overflow: auto;
    font-size: 0.85rem;
    font-family: monospace, monospace;
    border: 1px dashed rgba(250, 100, 50, 0.5);
}

.title {
    font-size: 2.5em;
}

.subtitle {
    font-weight: normal;
    font-size: 0.75em;
    color: #666;
}

.tags {
    margin-top: -1.5rem;
    padding-bottom: 1.5em;
}
.tags li {
    display: inline;
    margin-right: 0.5em;
}

figure {
    margin: 1em 0;
}
figure figcaption {
    font-family: monospace, monospace;
    font-size: 0.75em;
    text-align: center;
    color: grey;
}

.footnote-definition sup {
    margin-left: -1.5em;
    float: left;
}

.footnote-definition .footnote-body {
    margin: 1em 0;
    padding: 0 1em;
    border: 1px dashed rgba(250, 100, 50, 0.3);
    background-color: rgba(200, 200, 200, 0.2);
}
.footnote-definition .footnote-body p:only-child {
    margin: 0.2em 0;
}

header {
    display: flex;
    justify-content: space-between;
}
header nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
header a + a {
    margin-left: 1rem;
}

.preview {
    margin-top: 1rem;
    margin-bottom: 1rem; 
}

.title {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem; 
    font-size: 1.5rem;
    line-height: 2rem; 
    font-weight: 600; 
}

.tags {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem; 
    font-style: italic; 
}
`


// Set up email parameters
const htmlBody = juice.inlineContent(emailHtml, cssStyles);
const email = {
  "From": "joe@instantdb.com",
  "To": "joeaverbukh@gmail.com",
  "Subject": "[TEST EMAIL] Book summary",
  "HtmlBody": htmlBody
};

// console.log(htmlBody)

// Send the email through Postmark
client.sendEmail(email, function(error, result) {
  if (error) {
    console.error("Unable to send via postmark: " + error.message);
    return;
  }
  console.info("Sent to postmark for delivery")
});
