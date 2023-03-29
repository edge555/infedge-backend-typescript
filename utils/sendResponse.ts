import { Request, Response } from 'express';
import json2xmlparser from 'js2xmlparser';
const json2html = require('json-to-html');
const { toPlainText } = require('json-to-plain-text');

export const sendFinalResponse = (
  req: Request,
  res: Response,
  contentType: string,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendData: any
) => {
  res.setHeader('content-type', contentType);
  return res.status(statusCode).send(sendData);
};

export const sendJsonResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message: string,
  status: string
) => {
  const sendData = { data, message, status };
  sendFinalResponse(req, res, 'application/json', statusCode, sendData);
};

export const sendXmlResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message: string,
  status: string
) => {
  const sendData = json2xmlparser.parse('data', { data, message, status });
  sendFinalResponse(req, res, 'application/xml', statusCode, sendData);
};

export const sendTextHtmlResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message: string,
  status: string
) => {
  const sendData = json2html(
    JSON.parse(JSON.stringify({ data, message, status }))
  );
  sendFinalResponse(req, res, 'text/html', statusCode, sendData);
};

export const sendTextResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message: string,
  status: string
) => {
  const sendData = toPlainText(
    JSON.parse(JSON.stringify({ data, message, status }))
  );
  sendFinalResponse(req, res, 'text/plain', statusCode, sendData);
};

export const sendResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  message: string,
  status: string
) => {
  if (req.headers.accept == 'application/xml') {
    sendXmlResponse(req, res, statusCode, data, message, status);
  } else if (req.headers.accept == 'text/plain') {
    sendTextResponse(req, res, statusCode, data, message, status);
  } else if (req.headers.accept == 'text/html') {
    sendTextHtmlResponse(req, res, statusCode, data, message, status);
  } else {
    sendJsonResponse(req, res, statusCode, data, message, status);
  }
};

export default sendResponse;
