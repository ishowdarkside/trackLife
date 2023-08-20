function ValidationError(err, res) {
  const firstError = Object.values(err.errors)?.at(0)?.message;
  res.status(400).json({
    status: "fail",
    message: firstError,
  });
}

function DuplicateError(err, res) {
  const duplicate = Object.keys(err.keyValue).at(0);
  return res.status(200).json({
    status: "fail",
    message: `${duplicate} already in use`,
  });
}

const errMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    return res.status(err.statusCode || 500).json({
      err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") return ValidationError(err, res);
    if (err.code === 11000) return DuplicateError(err, res);
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    } else
      return res.status(500).json({
        status: "error",
        message: "Something went really wrong!",
      });
  }
};

module.exports = errMiddleware;
