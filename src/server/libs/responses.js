export function sendResponse(res, data) {
  return res.json({
    code: 200,
    data
  });
}


export function sendError(res, error) {
  return res.json({
    code: 500,
    name: error.name,
    message: error.message,
  });
}
