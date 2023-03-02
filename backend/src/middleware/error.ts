//treath all the errs responses catched
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err: any, _req: any, res: any) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code == 11000)
    error = new ErrorResponse(`Duplicate Field value entered`, 400);

  if (err.name == 'ValidationError')
    error = new ErrorResponse(
      Object.values(err.errors).map((val: any) => val.message),
      400
    );

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server err',
  });
};

export default errorHandler;
