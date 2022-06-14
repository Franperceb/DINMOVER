//treath all the errs responses catched
import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code == 11000)
    error = new ErrorResponse(`Duplicate Field value entered`, 400);

  if (err.name == 'ValidationError')
    error = new ErrorResponse(
      Object.values(err.errors).map((val) => val.message),
      400
    );

  res.status(error.message || 500).json({
    success: false,
    error: error.message || 'Server err',
  });
};

export default errorHandler;
