"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponse = sendResponse;
exports.sendError = sendError;
function sendResponse(res, data) {
  return res.json({
    code: 200,
    data: data
  });
}

function sendError(res, error) {
  return res.json({
    code: 500,
    name: error.name,
    message: error.message
  });
}