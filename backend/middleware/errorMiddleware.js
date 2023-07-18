const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  let message = error.message;
  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resorce Not Found";
    statusCode = 404;
  }
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? "😍😍😍" : error.stack,
  });
};

module.exports = { notFound, errorHandler };
