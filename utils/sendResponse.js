const json2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const { toPlainText } = require('json-to-plain-text');

exports.sendJsonResponse = (req, res, statusCode, data, message, status) => {
  const sendData = { data, message, status };
  this.sendFinalResponse(req, res, 'application/json', statusCode, sendData);
};

exports.sendXmlResponse = (req, res, statusCode, data, message, status) => {
  const sendData = json2xmlparser.parse('data', { data, message, status });
  this.sendFinalResponse(req, res, 'application/xml', statusCode, sendData);
};

exports.sendTextHtmlResponse = (req, res, statusCode, data, message, status) => {
  const sendData = json2html(JSON.parse(JSON.stringify({ data, message, status })));
  this.sendFinalResponse(req, res, 'text/html', statusCode, sendData);
};

exports.sendTextResponse = (req, res, statusCode, data, message, status) => {
  const sendData = toPlainText(JSON.parse(JSON.stringify({ data, message, status })));
  this.sendFinalResponse(req, res, 'text/plain', statusCode, sendData);
};

exports.sendFinalResponse = (req, res, contentType, statusCode, sendData) => {
  res.setHeader('content-type', contentType);
  return res.status(statusCode).send(sendData);
};

exports.sendResponse = (req, res, statusCode, data, message, status) => {
  if (req.headers.accept == 'application/xml') {
    this.sendXmlResponse(req, res, statusCode, data, message, status);
  } else if (req.headers.accept == 'text/plain') {
    this.sendTextResponse(req, res, statusCode, data, message, status);
  } else if (req.headers.accept == 'text/html') {
    this.sendTextHtmlResponse(req, res, statusCode, data, message, status);
  } else {
    this.sendJsonResponse(req, res, statusCode, data, message, status);
  }
};
