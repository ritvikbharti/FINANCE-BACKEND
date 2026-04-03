export const errorHandler = (err, req, res, next) => {
  console.log("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Server Error",
    error: err.message
  });
};