/*
  * Quick script for sending emails via postmark
  * Usage: node src/scripts/sendEmail.js
  * */

require('dotenv').config();

const Postmark = require('postmark');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const MyComponent = require('@/BookSumary/index');

// Replace 'your-server-token' with your actual Postmark server token
const client = new Postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Render your React component to a string
const emailHtml = ReactDOMServer.renderToString(React.createElement(MyComponent));

// Set up email parameters
const email = {
  "From": "joeaverbukh@gmail.com",
  "To": "joeaverbukh@gmail.com",
  "Subject": "[TEST EMAIL] Book summary",
  "HtmlBody": emailHtml,
};

// Send the email through Postmark
client.sendEmail(email, function(error, result) {
  if (error) {
    console.error("Unable to send via postmark: " + error.message);
    return;
  }
  console.info("Sent to postmark for delivery")
});
