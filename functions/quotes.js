const Quote = require('../quote_model.js');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ quotes: await Quote.find({}) })
  }
}